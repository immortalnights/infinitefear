'use strict';

export default class Booster {
	tagName = 'div';
	id = undefined;
	name = undefined;

	constructor(options)
	{
		this.id = options.id;
		this.name = options.name;

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
		buttonEl.innerText = "Boost";
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

	ready()
	{
	}

	activated()
	{
	}

	attach(parent)
	{
		parent.append(this.el);
		return this.el;
	}

	update()
	{
	}

	render()
	{
	}
}
