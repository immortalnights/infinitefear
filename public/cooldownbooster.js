'use strict';

import Booster from './booster.js';

export default class CooldownBooster extends Booster {
	constructor(options)
	{
		super(options);

		this.baseDuration = 30;
		this.duration = this.baseDuration;
	}

	ready()
	{
		return this.charge === 100;
	}

	activated(player)
	{
		this.charge = 0;
		player.fear = player.fear + this.boost;
	}

	upgrade(player)
	{
		super.upgrade(player);
		console.debug("Cooldown booster duration now", this.duration);
	}

	reset(player)
	{
		this.charge = 0;
		this.duration = this.baseDuration - (0.5 * this.level);
	}

	update(delta)
	{
		if (this.charge < 100)
		{
			let inc = (100 / this.duration) * delta;
			this.charge = Math.min(this.charge + inc, 100);
		}
	}

	render()
	{
		this.ui.label.innerText = this.boost.toFixed(2) + ' [' + this.charge.toFixed(2) + ']';
	}
}
