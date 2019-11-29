'use strict';

export default class ReplicateBooster {
	tagName = 'div';
	// terror cost
	cost = 0;
	level = 0;

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
		buttonEl.setAttribute('title', this.description);
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
		let ok = false;
		if (player.terror < this.cost)
		{
			console.error(`Cannot affod upgrade '${this.name}'`);
		}
		else if (this.level >= this.maxLevel)
		{
			console.error(`Upgrade '${this.name}' has reached maximum level`);
		}
		else
		{
			ok = true;
		}
		return ok;
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
		const upgradeBooster = function(boosterId) {
			const booster = game.boosters.find(function(b) {
				return b.id === boosterId;
			});

			booster.upgrade(player);
		}

		switch (this.id)
		{
			case 'productionupgrade':
			{
				game.producers.forEach(function(item) {
					item.upgrade(player);
				});
				break;
			}
			case 'upchargeboosterupgrade':
			{
				upgradeBooster('upcharge');
				break;
			}
			case 'powerboosterupgrade':
			{
				upgradeBooster('powerbooster');
				break;
			}
			case 'cooldownboosterupgrade':
			{
				upgradeBooster('cooldownbooster');
				break;
			}
			case 'replicateboosterupgrade':
			{
				upgradeBooster('replicatebooster');
				break;
			}
			case 'terrifyproducers':
			{
				player.upgrades.terrifyproducers = true;
				break;
			}
			default:
			{
				console.assert(false, `Unknown upgrade '${this.name}' (${this.id})`);
				break;
			}
		}

		this.level = this.level + 1;
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
