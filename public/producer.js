export default class Producer {
	tagName = 'div';

	constructor(parent, options)
	{
		this.id = options.id;
		this.name = options.name;
		this.production = options.production;
		this.multiplier = options.multiplier;
		this.cost = options.cost;
		this.parent = parent;
	}

	update()
	{
	}

	render()
	{
		let el = document.createElement(this.tagName);
		el.className = 'flex-container flex-horizontal space';

		let labelContainer = document.createElement('div');
		let label = document.createElement('label');
		label.innerText = this.name;
		labelContainer.append(label);
		el.append(labelContainer);

		let productionEl = document.createElement('div');
		el.append(productionEl);

		let multiplierEl = document.createElement('div');
		el.append(multiplierEl);

		let buttonContainer = document.createElement('div');
		buttonContainer.className = 'control';
		let buttonEl = document.createElement('button');
		buttonContainer.append(buttonEl);
		el.append(buttonContainer);

		this.render = () => {
			productionEl.innerText = (this.production < 10000 ? this.production.toFixed(2) : this.production.toExponential(2));
			multiplierEl.innerText = 'x' + (this.multiplier < 10000 ? this.multiplier.toFixed(2) : this.multiplier.toExponential(2));
			buttonEl.innerText = (this.cost < 10000 ? this.cost.toFixed(2) : this.cost.toExponential(2));
		}

		this.parent.append(el);
		return el;
	}
}