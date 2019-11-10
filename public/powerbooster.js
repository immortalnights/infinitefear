'use strict';

import Booster from './booster.js';

export default class PowerBooster extends Booster {
	constructor(options)
	{
		super(options);

		this.cost = 10;
		this.charge = 0;
		this.boost = options.boost;
		this.multiplier = options.multiplier;
	}

	activated()
	{
		this.charge = this.charge - this.cost;
	}

	ready()
	{
		return this.charge > this.cost;
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