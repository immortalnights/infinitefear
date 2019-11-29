'use strict';

export default class Producer {
	tagName = 'div';
	defaults = {
		level: 0,
		cost: 0,
		baseCost: 0,
		production: 0,
		baseProduction: 0,
		multiplier: 0,
		unlockProgress: 0
	}

	constructor(parent, options)
	{
		this.parent = parent;
		Object.assign(this, this.defaults);
		Object.assign(this, options);

		this.baseCost = this.cost || 1;
		this.baseProduction = this.production;

		this.el = document.createElement(this.tagName);
		this.el.className = 'flex-container flex-horizontal space';

		let labelContainer = document.createElement('div');
		let label = document.createElement('label');
		label.innerText = this.name;
		labelContainer.append(label);
		this.el.append(labelContainer);

		let productionEl = document.createElement('div');
		this.el.append(productionEl);

		let multiplierEl = document.createElement('div');
		this.el.append(multiplierEl);

		let buttonContainer = document.createElement('div');
		buttonContainer.className = 'control';
		let buttonEl = document.createElement('button');
		buttonEl.type = 'button';
		// buttonEl.setAttribute('title', this.description);
		buttonContainer.append(buttonEl);
		this.el.append(buttonContainer);

		this.ui = {};
		this.ui.productionEl = productionEl;
		this.ui.multiplierEl = multiplierEl;
		this.ui.buttonEl = buttonEl;
	}

	buy()
	{
		this.level = this.level + 1;
		this.cost = this.baseCost * Math.pow(1.09, this.level);
		this.multiplier = this.multiplier + 0.2;
	}

	upgrade(player)
	{
		this.baseProduction = this.baseProduction + 0.01;
	}

	reset(player)
	{
		this.level = 0;
		this.cost = this.baseCost;
		this.multiplier = 0;
		this.setProduction(player);
	}

	setProduction(player)
	{
		this.production = this.baseProduction;

		if (player.upgrades.terrifyproducers)
		{
			this.production = this.production + (0.002 * player.terror);
		}
	}

	attach()
	{
		this.parent.append(this.el);
		return this.el;
	}

	update(delta, game)
	{
		const player = game.player;
		this.setProduction(player);
	}

	render()
	{
		this.ui.productionEl.innerText = (this.production < 10000 ? this.production.toFixed(2) : this.production.toExponential(2));
		this.ui.multiplierEl.innerText = 'x' + (this.multiplier < 10000 ? this.multiplier.toFixed(2) : this.multiplier.toExponential(2));

		if (!this.available)
		{
			this.ui.buttonEl.setAttribute('disabled', '');
		}
		else
		{
			this.ui.buttonEl.removeAttribute('disabled');
		}
		this.ui.buttonEl.innerText = (this.cost < 10000 ? this.cost.toFixed(2) : this.cost.toExponential(2)) + ' [' + this.unlockProgress.toFixed(2) + '%]';
	}
}
