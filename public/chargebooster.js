'use strict';

import Booster from './booster.js';

export default class ChargeBooster extends Booster {
	constructor(options)
	{
		super(options);

		this.baseActivatedCharge = 8.12;
		this.activatedCharge = this.baseActivatedCharge;
	}

	ready()
	{
		return true;
	}

	activated(player)
	{
		if (this.charge === 0)
		{
			this.charge = 6.66;
		}
		else if (this.charge === 100)
		{
			this.charge = 0;
			player.fear = player.fear + this.boost;
		}
		else
		{
			this.charge = Math.min(this.charge + this.activatedCharge, 100);
		}
	}

	upgrade(player)
	{
		super.upgrade(player);
		console.debug("Charge booster now at", this.activatedCharge);
	}

	reset(player)
	{
		this.charge = 0;
		this.activatedCharge = this.baseActivatedCharge + (0.05 * this.level);
	}

	render()
	{
		this.ui.label.innerText = (this.charge === 100 ? this.boost.toFixed(2) : 0) + ' [' + this.charge.toFixed(2) + ']';
	}
}
