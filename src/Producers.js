import React from 'react';
import {ProducerContext} from './ProducerContext';

class Producer extends React.Component {
	render()
	{
		const totalProduction = (this.props.production * this.props.quantity) * this.props.multiplier;
		return (
			<div>
				<div>{this.props.id}</div>
				<div>{this.props.production}</div>
				<div>x {this.props.quantity}</div>
				<div>x {this.props.multiplier.toFixed(2)}</div>
				<div>= {totalProduction}</div>
				<div><button type="button" onClick={e => { this.props.buy(this.props.id) }}>Buy {this.props.cost}</button></div>
			</div>
		);
	}
}

class Producers extends React.Component {
	render()
	{
		return (
			<section>
				<h3>Producers</h3>
				<ProducerContext.Consumer>
					{(producers) => {
						return producers.map(item => { return (<Producer key={item.id} {...item} buy={this.props.buy} />); })
					}}
				</ProducerContext.Consumer>
			</section>
		);
	}
}

export default Producers;
