'use strict';

import Producer from './producer.js';

const PRODUCERS = [{
	id: 'scarypumpkin',
	name: 'Scary Pumpkin',
	cost: 1,
	production: 1,
	multiplier: 1
}, {
	id: 'creepyspider',
	name: 'Creepy Spider',
	cost: 10,
	production: 3,
	multiplier: 1
}, {
	id: 'walkingskeleton',
	name: 'Walking Skeleton',
	cost: 100,
	production: 8,
	multiplier: 1
}];

export default class Game {
	constructor()
	{
		this.fear = 500000;
		this.production = 0;
		this.producers = [];
	}

	buy(producer)
	{
		if (this.fear > producer.cost)
		{
			this.fear = this.fear - producer.cost;
			producer.cost = producer.cost * 1.15;
			producer.multiplier = producer.multiplier + 0.1;
		}
	}

	update(delta)
	{
		this.production = this.producers.reduce(function(total, current, index, arr) {
			// console.log(total, current, index);
			return total + (current.production * current.multiplier);
		}, 0);

		this.fear = this.fear + (this.production * delta);
		// this.fearEl.innerText = (this.fear < 10000 ? this.fear : this.fear.toExponential());
		// this.productionEl.innerText = (this.production < 10000 ? this.production : this.production.toExponential());
		// this.producers.update();
	}

	render()
	{
		this.fearEl = document.getElementById('fearvalue');
		this.productionEl = document.getElementById('productionvalue');

		let producersContainerEl = document.getElementById('producers');
		this.producers = PRODUCERS.map((item) => {
			let p = new Producer(producersContainerEl, item);
			let el = p.render();
			el.addEventListener('click', (event) => {
				if (event.target.tagName === 'BUTTON')
				{
					this.buy(p);
				}
			});
			return p;
		});

		this.render = () => {
			this.fearEl.innerText = (this.fear < 10000 ? this.fear.toFixed(2) : this.fear.toExponential(2));
			this.productionEl.innerText = (this.production < 10000 ? this.production.toFixed(2) : this.production.toExponential(2));

			this.producers.forEach(p => p.render());
		}

		this.render();

	}
}