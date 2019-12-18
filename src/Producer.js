import React from 'react';


export default class Producer extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = { ... this.props };
		this.handleUpgradeClick = this.handleUpgradeClick.bind(this);
	}

	get production()
	{
		return (this.state.production * this.state.multiplier) * this.state.quantity;
	}

	get level()
	{
		return this.state.level;
	}

	render()
	{
		const output = this.production;
		const progress = (0).toFixed(2);
		return (<div className="flex-container flex-horizontal space">
			<div><label>{this.props.name}</label></div>
			<span>{this.state.production}</span>&nbsp;
			<span>x{this.state.multiplier}</span>&nbsp;
			<span>x{this.state.quantity}</span> =&nbsp;
			<span>{output}</span>
			<div className="control">
				<button type="button" onClick={this.handleUpgradeClick}>{this.state.cost} [{progress}%]</button>
			</div>
		</div>);
	}

	handleUpgradeClick(event)
	{
		this.props.upgrade(this.props.id);
	}
}