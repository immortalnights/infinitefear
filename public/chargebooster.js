'use strict';

import Booster from './booster.js';

export default class ChargeBooster extends Booster {
	constructor(options)
	{
		super(options);
	}

	ready()
	{
		return true;
	}

	activated(player)
	{
		if (this.charge === 0)
		{
			this.charge = 1 * 0.15;
		}
		else if (this.charge === 100)
		{
			this.charge = 0;
			player.fear = player.fear + this.boost;
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
		this.ui.label.innerText = (this.charge === 100 ? this.boost.toFixed(2) : 0) + ' [' + this.charge.toFixed(2) + ']';
	}
}