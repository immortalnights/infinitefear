'use strict';

import Producer from './producer.js';
import ChargeBooster from './chargebooster.js';
import PowerBooster from './powerbooster.js';
import CooldownBooster from './cooldownbooster.js';
import ReplicateBooster from './replicatebooster.js';

const PRODUCERS = [{
	id: 'scarypumpkin',
	name: 'Scary Pumpkin',
	cost: 0,
	production: 1,
	multiplier: 0,
	available: false
}, {
	id: 'creepyspider',
	name: 'Creepy Spider',
	cost: 10,
	production: 3,
	multiplier: 0,
	available: false
}, {
	id: 'wobblyskeleton',
	name: 'Wobbly Skeleton',
	cost: 100,
	production: 8,
	multiplier: 0,
	available: false
}];

const BOOSTERS = [{
	id: 'upcharge',
	type: ChargeBooster,
	name: 'Up Charge',
	cost: 0,
	boost: 1,
	multiplier: 1
}, {
	id: 'powerbooster',
	type: PowerBooster,
	name: 'Power Booster',
	description: "click uses power, if boost take power < 0 delay for reset. Power increase over time, boost stays the same",
	cost: 0,
	boost: 18,
	multiplier: 1
}, {
	id: 'cooldownbooster',
	type: CooldownBooster,
	name: 'Cooldown Booster',
	description: "boost has cooldown when used; boosting during cooldown extends the cooldown",
	cost: 0,
	boost: 150,
	multiplier: 1
}, {
	id: 'replicatebooster',
	type: ReplicateBooster,
	name: 'Replicate Booster',
	description: "boost increaes over time, consumed when used max based on 'something' (maybe current fear?)",
	cost: 0,
	boost: 1,
	multiplier: 1
}];

class Player {
	fear = 0;
}

export default class Game {
	constructor()
	{
		this.player = new Player();
		this.production = 0;
		this.producers = [];
		this.boosters = [];
	}

	buy(producer)
	{
		if (this.player.fear >= producer.cost)
		{
			this.player.fear = this.player.fear - producer.cost;
			producer.cost = 1 + (producer.cost * 1.15);
			producer.multiplier = producer.multiplier + 0.1;
		}
	}

	boost(booster)
	{
		if (booster.ready())
		{
			this.player.fear = this.player.fear + booster.boost;
			booster.activated();
		}
		else
		{
			console.log(`'${booster.name}' is not ready`);
		}
	}

	update(delta)
	{
		const player = this.player;
		this.production = this.producers.reduce(function(total, current, index, arr) {
			// console.log(total, current, index);
			return total + (current.production * current.multiplier);
		}, 0);

		player.fear = player.fear + (this.production * delta);
		// this.fearEl.innerText = (this.fear < 10000 ? this.fear : this.fear.toExponential());
		// this.productionEl.innerText = (this.production < 10000 ? this.production : this.production.toExponential());
		// this.producers.update();

		this.producers.forEach((producer) => {
			producer.update();
			producer.available = (player.fear >= producer.cost);
			producer.unlockProgress = producer.available ? 100 : (player.fear > 0 ? (player.fear / producer.cost) * 100 : 0);
		});

		this.boosters.forEach((booster) => {
			booster.update();
			// booster.available = (player.fear >= booster.cost);
			// booster.unlockProgress = booster.available ? 100 : (player.fear > 0 ? (player.fear / booster.cost) * 100 : 0);
		});
	}

	render()
	{
		this.fearEl = document.getElementById('fearvalue');
		this.productionEl = document.getElementById('productionvalue');

		let producersContainerEl = document.getElementById('producers');
		this.producers = PRODUCERS.map((item) => {
			let p = new Producer(producersContainerEl, item);
			let el = p.attach();
			el.addEventListener('click', (event) => {
				if (event.target.tagName === 'BUTTON')
				{
					this.buy(p);
				}
			});
			return p;
		});

		let boosterContainerEl = document.getElementById('boosters');
		this.boosters = BOOSTERS.map((item) => {
			let b = new (item.type)(item);
			let el = b.attach(boosterContainerEl);
			el.addEventListener('click', (event) => {
				if (event.target.tagName === 'BUTTON')
				{
					this.boost(b);
				}
			});
			return b;
		});



		this.render = () => {
			this.fearEl.innerText = (this.player.fear < 10000 ? this.player.fear.toFixed(2) : this.player.fear.toExponential(2));
			this.productionEl.innerText = (this.production < 10000 ? this.production.toFixed(2) : this.production.toExponential(2));

			this.producers.forEach(p => p.render());
			this.boosters.forEach(b => b.render());
		}

		this.render();

	}
}