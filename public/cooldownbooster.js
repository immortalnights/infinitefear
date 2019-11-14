'use strict';

import Booster from './booster.js';

export default class CooldownBooster extends Booster {
	constructor(options)
	{
		super(options);
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

	update()
	{
		if (this.charge < 100)
		{
			this.charge = this.charge + 0.08;
			this.charge = Math.min(this.charge, 100);
		}
	}

	render()
	{
		this.ui.label.innerText = this.boost.toFixed(2) + ' [' + this.charge.toFixed(2) + ']';
	}
}