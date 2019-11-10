'use strict';

import Booster from './booster.js';

export default class ChargeBooster extends Booster {
	constructor(options)
	{
		super(options);

		this.boost = options.boost;
		this.multiplier = options.multiplier;
		this.charge = 0;
	}

	ready()
	{
		if (this.charge === 100)
		{
			this.boost = this.boost * 100;
		}
		return true;
	}

	activated()
	{
		if (this.charge === 0)
		{
			this.charge = 1 * 0.15;
		}
		else if (this.charge === 100)
		{
			this.charge = 0;
			this.boost = 1;
		}
		else
		{
			this.charge = Math.min(this.charge * 1.15, 100);
		}
	}

	update()
	{

	}

	render()
	{
		this.ui.label.innerText = this.boost.toFixed(2) + ' [' + this.charge.toFixed(2) + ']';
	}
}