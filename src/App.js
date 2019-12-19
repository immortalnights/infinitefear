import React from 'react';
import Producers from './Producers';
import {ProducerContext} from './ProducerContext';
import './App.css';

import data from './data.json';

const ResourcesContext = React.createContext();
// const ProducerContext = React.createContext();

class Resource extends React.Component {
	render()
	{
		return (
			<div>
				<h4>{this.props.id}</h4>
				<div>{this.props.value.toFixed(2)}</div>
				<div>{this.props.production ? this.props.production.toFixed(2) : ''}</div>
			</div>
		);
	}
}

class FearResource extends React.Component {
	constructor(props)
	{
		super(props);
	}

	render()
	{
		const totalProduction = this.props.producers.reduce(function(value, item) {
			const production = ((item.production * item.quantity) * item.multiplier);
			return value + production;
		}, 0);

		return (<Resource id={this.props.id} value={this.props.value} production={totalProduction} />);
	}
}
class TerrorResource extends React.Component {
	constructor(props)
	{
		super(props);
	}

	render()
	{
		// console.log("->", this.props, this.state, this.context);
		return (<Resource id={this.props.id} value={this.props.value} />);
	}
}
class SoulsResource extends React.Component {
	constructor(props)
	{
		super(props);
	}

	render()
	{
		// console.log("->", this.props, this.state, this.context);
		return (<Resource id={this.props.id} value={this.props.value} />);
	}
}


class ResourceList extends React.Component {
	static contextType = ResourcesContext;

	render()
	{
		// console.log("->", this.props, this.state, this.context);

		const fear = this.context.find(function(item) {
			return item.id === 'fear';
		});
		const terror = this.context.find(function(item) {
			return item.id === 'terror';
		});
		const souls = this.context.find(function(item) {
			return item.id === 'souls';
		});

		return (
			<>
				<ProducerContext.Consumer>
					{(producers) => (<FearResource {...fear} producers={producers} />)}
				</ProducerContext.Consumer>
				<TerrorResource {...terror} />
				<SoulsResource {...souls} />
			</>
		);
		// 	<ProducerContext.Consumer>
		// 		{(producers) => (
		// 			<ResourcesContext.Consumer>
		// 			{(resources) => (
		// 				<div>{producers.map(o => o.id)}, {resources.map(o => o.id)}</div>
		// 			)}
		// 			</ResourcesContext.Consumer>
		// 		)}
		// 	</ProducerContext.Consumer>
		// );
	}
}

// const providerReducer = function(state, action) {
// 	console.log("action", action);

// 	let newState = { ...state };

// 	switch (action.type)
// 	{
// 		case 'UPGRADE':
// 		{
// 			const index = newState.producers.findIndex(function(item) {
// 				return item.id === action.id;
// 			});

// 			if (index !== -1)
// 			{
// 				let prod = {...newState.producers[index]};
// 				prod.quantity = prod.quantity + 1;
// 				newState.producers[index] = prod;
// 				return newState;
// 			}
// 			break;
// 		}
// 		default:
// 		{
// 			return state;
// 		}
// 	}

// 	return state;
// }

// const ProducerContext = React.createContext();


// class Producers extends React.Component {
// 	static contextType = ProducerContext;

// 	render()
// 	{
// 		const up = (id) => {
// 			console.log("up1", id);
// 			this.context.upgrade(id);
// 		};

// 		console.log(this.props);
// 		return (
// 			<div>
// 				{this.props.producers.map((producer) => 
// 					(<Producer key={producer.id} {...producer} upgrade={up} />)
// 				)}
// 			</div>
// 		);
// 	}
// }


// const ProducerProvider = function({totalProduction, children}) {
// 	const [state, dispatch] = React.useReducer(providerReducer, data);

// 	const value = {
// 		producers: state.producers,
// 		upgrade: (id) => {
// 			console.debug("up2", id);
// 			dispatch({ type: 'UPGRADE', id });
// 		}
// 	};

// 	return (
// 		<ProducerContext.Provider value={value}>
// 			{children}
// 		</ProducerContext.Provider>
// 	);
// }

// const ProducerSection = function() {
// 	const { producers } = React.useContext(ProducerContext);

// 	let totalProduction = 0;
// 	let totalLevels = 0;
// 	// state.producers.forEach((p) => {
// 	// 	totalProduction = totalProduction + p.production;
// 	// 	totalLevels = totalLevels + p.level;
// 	// });

// 	return (
// 		<>
// 			<div>Total Production: {totalProduction}</div>
// 			<div>Total Levels: {totalLevels}</div>
// 			<Producers producers={producers} />
// 		</>
// 	);
// }


// 		// <>
// 		// <>

// export default class App extends React.Component {
// 	render()
// 	{
// 		return (
// 			<ProducerProvider>
// 				<ProducerSection />
// 			</ProducerProvider>
// 		);
// 	}
// }

function useFearResource() {
	const contextValue = React.useContext(ResourcesContext);

	return contextValue.find((item) => {
		return item.id === 'fear';
	});
}



export default class App extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = data;

		this.buyProducer = (producer) => {
			const pIndex = this.state.producers.findIndex(function(item) {
				return item.id === producer;
			});

			const producers = [...this.state.producers];
			const item = { ...producers[pIndex] };

			let fear = this.state.resources.find((item) => {
				return item.id === 'fear';
			});

			if (item.cost <= fear.value)
			{
				const index = this.state.resources.findIndex((item) => {
					return item.id === 'fear';
				});
				fear = {...fear};
				fear.value = fear.value - item.cost;
				// this.state.resources = [...this.state.resources];
				this.state.resources[index] = fear;
				this.setState({resources: this.state.resources});

				item.quantity = item.quantity + 1;
				item.cost = +Math.max(item.cost * 1.3, 1).toFixed(2);
				producers[pIndex] = item;
			}
			else
			{
				console.warn(`Cannot afford producer '${item.id}' need ${item.cost} have ${fear.value}`);
			}

			this.setState({ producers });
		}
	}

	componentDidMount()
	{
		// first frame
		requestAnimationFrame(() => { this.update(0); });
	}

	update(delta)
	{
		let resources = [...this.state.resources];
		const types = resources.map((item) => {
			return item.id;
		});

		types.forEach((type) => {
			const index = resources.findIndex((item) => {
				return item.id === type;
			});

			const resource = {...resources[index]};

			// update resource
			switch (resource.id)
			{
				case 'fear':
				{
					// deduplicate
					const totalProduction = this.state.producers.reduce(function(value, item) {
						const production = ((item.production * item.quantity) * item.multiplier);
						return value + production;
					}, 0);

					resource.value = resource.value + (totalProduction * delta);

					break;
				}
			}

			resources[index] = resource
		});

		this.setState({resources: resources});

		// next frame
		let last = Date.now();
		requestAnimationFrame(() => {
			const now = Date.now();
			const delta = (now - last) / 1000;

			last = Date.now();
			this.update(delta);
		});
	}

	render()
	{
		return (
			<ProducerContext.Provider value={this.state.producers}>
				<ResourcesContext.Provider value={this.state.resources}>
					<ResourceList />
				</ResourcesContext.Provider>
				<Producers buy={this.buyProducer} />
			</ProducerContext.Provider>
		);
	}
}