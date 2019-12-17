import React from 'react';

const { Provider, Consumer } = React.createContext('producers');

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
				<div><button type="button" onClick={e => { this.props.update(this.props.id) }}>Buy</button></div>
			</div>
		);
	}
}

const ProducerList = function() {
	return (
		<Consumer>
			{({producers, update}) => (
				<div className="flex-container">
					{producers.map(item => (
						<Producer key={item.id} {...item} update={update} />
					))}
				</div>
			)}
		</Consumer>
	);
}

class Producers extends React.Component {
	constructor(props)
	{
		super(props);

		this.state = {
			producers: [{
				id: 'scarypumpkin',
				production: 1,
				quantity: 0,
				multiplier: 1.00
			},
			{
				id: 'creepyspider',
				production: 8,
				quantity: 0,
				multiplier: 1.00
			}
		]};

		this.update = (producer) => {
			const index = this.state.producers.findIndex(function(item) {
				return item.id === producer;
			});

			const producers = [...this.state.producers];
			const item = { ...producers[index] };
			item.quantity = item.quantity + 1;
			producers[index] = item;

			this.setState({producers});
		}
	}

	render()
	{
		const { update } = this;
		const producers = this.state.producers;

		const totalProduction = producers.reduce(function(value, item) {
			const production = ((item.production * item.quantity) * item.multiplier);
			return value + production;
		}, 0);

		return (
			<Provider value={{ producers, update }}>
				<section>
					<h3>Producers</h3>
					<ProducerList />
					<div><strong>Total</strong> {totalProduction}</div>
				</section>
			</Provider>
		);
	}
}

export default Producers;
