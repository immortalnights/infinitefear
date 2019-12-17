import React from 'react';
import Producers from './Producers';
import './App.css';

// import data from './data.json';

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

export default class App extends React.Component {
	render()
	{
		return (
			<>
				<Producers />
			</>
		);
	}
}