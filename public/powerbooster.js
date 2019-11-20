'use strict';

import Booster from './booster.js';

export default class PowerBooster extends Booster {
	constructor(options)
	{
		super(options);

		// default 2s per charge
		this.baseDuration = 2;
		this.duration = this.baseDuration;
	}

	ready()
	{
		return this.charge > this.cost;
	}

	activated(player)
	{
		this.charge = this.charge - this.cost;
		player.fear = player.fear + this.boost;
	}

	upgrade(player)
	{
		super.upgrade(player);
		console.debug("Power booster duration now", this.duration);
	}

	reset(player)
	{
		this.charge = 0;
		this.duration = Math.max(this.baseDuration - (0.025 * this.level), 0.25);
	}

	update(delta)
	{
		if (this.charge < 100)
		{
			let inc = (10 / this.duration) * delta;
			this.charge = Math.min(this.charge + inc, 100);
		}
	}

	render()
	{
		this.ui.label.innerText = this.boost.toFixed(2) + ' [' + this.charge.toFixed(2) + ']';
	}
}
