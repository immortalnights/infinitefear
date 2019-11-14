export default class Producer {
	tagName = 'div';
	cost = 0;
	production = 0;
	multiplier = 0;
	unlockProgress = 0;

	constructor(parent, options)
	{
		this.parent = parent;
		Object.assign(this, options);

		this.el = document.createElement(this.tagName);
		this.el.className = 'flex-container flex-horizontal space';

		let labelContainer = document.createElement('div');
		let label = document.createElement('label');
		label.innerText = this.name;
		labelContainer.append(label);
		this.el.append(labelContainer);

		let productionEl = document.createElement('div');
		this.el.append(productionEl);

		let multiplierEl = document.createElement('div');
		this.el.append(multiplierEl);

		let buttonContainer = document.createElement('div');
		buttonContainer.className = 'control';
		let buttonEl = document.createElement('button');
		buttonEl.type = 'button';
		buttonContainer.append(buttonEl);
		this.el.append(buttonContainer);

		this.ui = {};
		this.ui.productionEl = productionEl;
		this.ui.multiplierEl = multiplierEl;
		this.ui.buttonEl = buttonEl;
	}

	attach()
	{
		this.parent.append(this.el);
		return this.el;
	}

	update()
	{
	}

	render()
	{
		this.ui.productionEl.innerText = (this.production < 10000 ? this.production.toFixed(2) : this.production.toExponential(2));
		this.ui.multiplierEl.innerText = 'x' + (this.multiplier < 10000 ? this.multiplier.toFixed(2) : this.multiplier.toExponential(2));

		if (!this.available)
		{
			this.ui.buttonEl.setAttribute('disabled', '');
		}
		else
		{
			this.ui.buttonEl.removeAttribute('disabled');
		}
		this.ui.buttonEl.innerText = (this.cost < 10000 ? this.cost.toFixed(2) : this.cost.toExponential(2)) + ' [' + this.unlockProgress.toFixed(2) + '%]';
	}
}