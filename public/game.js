'use strict';

import Producer from './producer.js';
import ChargeBooster from './chargebooster.js';
import PowerBooster from './powerbooster.js';
import CooldownBooster from './cooldownbooster.js';
import ReplicateBooster from './replicatebooster.js';
import Upgrade from './upgrade.js';

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
}];

const BOOSTERS = [{
	id: 'upcharge',
	type: ChargeBooster,
	name: 'Up Charge',
	description: "click increase charge, at max charge produces a lot of fear",
	cost: 0,
	boost: 25,
	multiplier: 1
}, {
	id: 'powerbooster',
	type: PowerBooster,
	name: 'Power Booster',
	description: "click uses power, if boost take power < 0 delay for reset. Power increase over time, boost stays the same",
	cost: 10,
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
	description: "boost increases over time, consumed when used max based on 'something' (maybe current fear?)",
	cost: 0,
	boost: 1,
	multiplier: 1
}];

const UPGRADES = [{
	id: 'productionupgrade',
	name: 'Production Upgrade',
	description: "Increases all fear produced by producers by 0.1",
	cost: 1
}, {
	id: 'upchargeboosterupgrade',
	name: 'Up Charge Upgrade',
	description: "Increases charge generation of booster by {value}%",
	cost: 1
}, {
	id: 'powerboosterupgrade',
	name: 'Power Booster Rate Upgrade',
	description: "Increases charge generation of booster by {value}%",
	cost: 1
}, {
	id: 'cooldownboosterupgrade',
	name: 'Cooldown Booster Upgrade',
	description: "Decreases cooldown time of booster by {value}%",
	cost: 1
}, {
	id: 'replicateboosterupgrade',
	name: 'Replicate Booster Upgrade',
	description: "Increases maximum replication by {value}%",
	cost: 1
}, {
	id: 'terrifyproducers',
	name: 'Terrify Producers',
	description: "Unspent terror provides increases producer production by {value}%",
	cost: 25,
	maxLevel: 1
}];

class Player {
	fear = 0;
	terror = 0;
	// total number spooks
	spooked = 0;
	upgrades = {};

	constructor()
	{
		this.lastSpook = Date.now();
	}

	spook(cost)
	{
		console.debug("Spook duration", Date.now() - this.lastSpook);
		this.terror = this.terror + 1;
		this.fear = this.fear - cost;
		this.spooked = this.spooked + 1;
		this.lastSpook = Date.now();
	}

	nextSpookCost()
	{
		return 666 * Math.pow(1 + this.spooked, 1.11);
	}

	nextHarvestCost()
	{
		return false;
	}
}



export default class Game {
	constructor()
	{
		console.time('firstspook');
		this.player = new Player();
		this.production = 0;
		this.producers = [];
		this.boosters = [];
		this.upgrades = [];
	}

	buy(producer)
	{
		if (this.player.fear >= producer.cost)
		{
			this.player.fear = this.player.fear - producer.cost;
			producer.buy(this, this.player);
		}
	}

	boost(booster)
	{
		if (booster.ready(this.player))
		{
			booster.activated(this.player);
		}
		else
		{
			console.log(`'${booster.name}' is not ready`);
		}
	}

	upgrade(upgrade)
	{
		if (upgrade.ready(this.player))
		{
			upgrade.activated(this, this.player);
		}
		else
		{
			console.log(`'${upgrade.name}' is not ready`);
		}
	}

	// reset
	spook(event)
	{
		let cost = this.player.nextSpookCost();
		if (this.player.fear >= cost)
		{
			while (this.player.fear >= cost)
			{
				this.player.spook(cost);
				cost = this.player.nextSpookCost();
			}

			// reset the producers
			this.producers.forEach((prod) => {
				prod.reset(this.player);
			});

			this.boosters.forEach((booster) => {
				booster.reset(this.player);
			});
		}
	}

	update(delta)
	{
		const player = this.player;
		this.production = this.producers.reduce(function(total, current, index, arr) {
			// console.log(total, current, index);
			return total + (current.production * current.multiplier);
		}, 0);

		this.production = this.production + (player.fear * (player.terror * 0.000001));

		player.fear = player.fear + (this.production * delta);
		// this.fearEl.innerText = (this.fear < 10000 ? this.fear : this.fear.toExponential());
		// this.productionEl.innerText = (this.production < 10000 ? this.production : this.production.toExponential());
		// this.producers.update();

		this.producers.forEach((producer) => {
			producer.update(delta, game);
			producer.available = (player.fear >= producer.cost);
			producer.unlockProgress = producer.available ? 100 : (player.fear > 0 ? (player.fear / producer.cost) * 100 : 0);
		});

		this.boosters.forEach((booster) => {
			booster.update(delta, game);
			// booster.available = (player.fear >= booster.cost);
			// booster.unlockProgress = booster.available ? 100 : (player.fear > 0 ? (player.fear / booster.cost) * 100 : 0);
		});
	}

	render()
	{
		this.terrorEl = document.getElementById('terrorvalue');
		this.fearEl = document.getElementById('fearvalue');
		this.productionEl = document.getElementById('productionvalue');

		let producersContainerEl = document.getElementById('producers');
		this.producers = PRODUCERS.map((item) => {
			console.log(`Initialize '${Producer.name}' '${item.name}`);
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
			console.log(`Initialize '${item.type.name}'`);
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

		let upgradeContainerEl = document.getElementById('upgrades');
		this.upgrades = UPGRADES.map((item) => {
			console.log(`Initialize '${Upgrade.name}'`);
			let u = new Upgrade(item);
			let el = u.attach(upgradeContainerEl);
			el.addEventListener('click', (event) => {
				if (event.target.tagName === 'BUTTON')
				{
					this.upgrade(u);
				}
			});
			return u;
		});

		const spookBtn = document.getElementById('invokespook');
		spookBtn.addEventListener('click', this.spook.bind(this));

		this.render = () => {
			if (this.player.terror > 0)
			{
				this.terrorEl.parentNode.style.display = 'block';
			}

			this.terrorEl.innerText = (this.player.terror < 10000 ? this.player.terror.toFixed(2) : this.player.terror.toExponential(2));
			this.fearEl.innerText = (this.player.fear < 10000 ? this.player.fear.toFixed(2) : this.player.fear.toExponential(2));
			this.productionEl.innerText = (this.production < 10000 ? this.production.toFixed(2) : this.production.toExponential(2));

			const spookCost = this.player.nextSpookCost();
			const spookProgress = this.player.fear / spookCost;
			if (this.player.fear < spookCost)
			{
				spookBtn.setAttribute('disabled', true);
			}
			else
			{
				spookBtn.removeAttribute('disabled');
			}
			spookBtn.innerHTML = 'Spook!<br />' + spookCost.toFixed(0) + '<br />[' + Math.min(spookProgress * 100, 100).toFixed(2) + '%]';

			this.producers.forEach(p => p.render());
			this.boosters.forEach(b => b.render());
			this.upgrades.forEach(u => u.render());
		}

		this.render();
	}
}
