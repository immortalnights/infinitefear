import React from 'react';
import Producer from './Producer';
import logo from './logo.svg';
import './App.css';

const PRODUCERS = [{
	id: 'scarypumpkin',
	name: 'Scary Pumpkin',
	baseCost: 1,
	cost: 0,
	production: 1,
	multiplier: 0,
	available: false
}, {
	id: 'creepyspider',
	name: 'Creepy Spider',
	baseCost: 10,
	cost: 10,
	production: 3,
	multiplier: 0,
	available: false
}, {
	id: 'wobblyskeleton',
	name: 'Wobbly Skeleton',
	baseCost: 100,
	cost: 100,
	production: 8,
	multiplier: 0,
	available: false
}, {
	id: 'fourth',
	name: 'Fourth',
	baseCost: 1000,
	cost: 1000,
	production: 13,
	multiplier: 0,
	available: false
}, {
	id: 'fifth',
	name: 'fifth',
	baseCost: 10000,
	cost: 10000,
	production: 20,
	multiplier: 0,
	available: false
}, {
	id: 'sixth',
	name: 'sixth',
	baseCost: 100000,
	cost: 100000,
	production: 80,
	multiplier: 0,
	available: false
}, {
	id: 'seventh',
	name: 'seventh',
	baseCost: 1000000,
	cost: 1000000,
	production: 666,
	multiplier: 0,
	available: false
}];



export default class App extends React.Component {

	constructor(props)
	{
		super(props);

		this.producers = PRODUCERS.map((producer) => (<Producer key={producer.id} {...producer} />) );
		console.log("const");
	}

	render()
	{
		let totalProduction = 0;
		this.producers.forEach((p) => {
			totalProduction = totalProduction + p.production;
		});

		return (
			<div>
				<div>{totalProduction}</div>
				<section>
					{this.producers}
				</section>
			</div>
		);
	}
}