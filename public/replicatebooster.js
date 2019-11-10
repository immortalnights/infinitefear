'use strict';

import Booster from './booster.js';

export default class ReplicateBooster extends Booster {
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
	}

	ready()
	{
		return true;
	}

	update()
	{
		this.boost = Math.min(window.game.production, window.game.player.fear / 10, this.boost + .01);
	}

	render()
	{
		this.ui.label.innerText = this.boost.toFixed(2);
	}
}