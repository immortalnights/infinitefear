'use strict';

import Booster from './booster.js';

export default class PowerBooster extends Booster {
	constructor(options)
	{
		super(options);
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

	update()
	{
		if (this.charge < 100)
		{
			this.charge = this.charge + 0.07;
			this.charge = Math.min(this.charge, 100);
		}
	}

	render()
	{
		this.ui.label.innerText = this.boost.toFixed(2) + ' [' + this.charge.toFixed(2) + ']';
	}
}