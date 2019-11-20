'use strict';

import Booster from './booster.js';

export default class ReplicateBooster extends Booster {

	constructor(options)
	{
		super(options);

		// boost upto 1/3 (plus 0.0025 per level) of the current production
		this.baseLimit = 0.15;
		this.limit = this.baseLimit;
	}

	activated(player)
	{
		player.fear = player.fear + this.boost;
	}

	ready()
	{
		return this.boost > 0;
	}

	upgrade(player)
	{
		super.upgrade(player);
		console.debug("Replicate booster now", this.limit);
	}

	reset(player)
	{
		this.limit = this.baseLimit + (0.0025 * this.level);
	}

	update(delta, game)
	{
		let max = game.production * this.limit;
		this.boost = Math.min(max, this.boost + .01);
	}

	render()
	{
		this.ui.label.innerText = this.boost.toFixed(2);
	}
}
