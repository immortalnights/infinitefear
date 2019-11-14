'use strict';

export default class ReplicateBooster {
	// terror cost
	cost = 0;

	constructor(options)
	{
		Object.assign(this, options);

		this.el = document.createElement(this.tagName);
		this.el.className = 'flex-container flex-horizontal space';

		let labelContainer = document.createElement('div');
		let label = document.createElement('label');
		label.innerText = this.name;
		labelContainer.append(label);
		this.el.append(labelContainer);

		let buttonContainer = document.createElement('div');
		buttonContainer.className = 'control';
		let buttonEl = document.createElement('button');
		buttonEl.type = 'button';
		buttonEl.innerText = "Upgrade";
		buttonContainer.append(buttonEl);
		this.el.append(buttonContainer);

		let boostLabelContainer = document.createElement('div');
		let boostLabel = document.createElement('label');
		boostLabel.innerText = '';
		boostLabelContainer.append(boostLabel);
		this.el.append(boostLabelContainer);

		this.ui = {};
		this.ui.btn = buttonEl;
		this.ui.label = boostLabelContainer;
	}

	ready(player)
	{
		return player.terror >= this.cost;
	}

	activated(game)
	{
		const player = game.player;
		if (player.terror >= this.cost)
		{
			this.upgrade.call(this, game, player);
		}
	}

	upgrade(game, player)
	{
		switch (this.id)
		{
			case 'productionupgrade':
			{
				game.producers.forEach(function(item) {
					item.production = item.production * 1.01;
				});
				break;
			}
			case 'upchargeboostupgrade':
			{
				break;
			}
			case 'powerbooster':
			{
				break;
			}
			case 'productionupgrade':
			{
				break;
			}
			case 'replicateboosterupgrade':
			{
				break;
			}
			default:
			{
				console.assert(false, `Unknown upgrade '${this.name}' (${this.id})`);
				break;
			}
		}

		player.terror = player.terror - this.cost;
	}

	attach(parent)
	{
		parent.append(this.el);
		return this.el;
	}

	render()
	{

	}
}