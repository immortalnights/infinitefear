'use strict';

import Booster from './booster.js';

export default class ReplicateBooster extends Booster {

	constructor(options)
	{
		super(options);
	}

	activated(player)
	{
		player.fear = player.fear + this.boost;
	}

	ready()
	{
		return true;
	}

	update()
	{
		this.boost = Math.min(window.game.production * .3, window.game.player.fear / 10, this.boost + .01);
	}

	render()
	{
		this.ui.label.innerText = this.boost.toFixed(2);
	}
}