import React, { Component } from "react";

const { Provider, Consumer } = React.createContext("color");

const ColorInput = function({ colorName }) {
	return (
	  <Consumer>
	    {({ colors, update }) => (
	      <label>
	        <input
	          type="range"
	          min="0"
	          max="255"
	          value={colors[colorName]}
	          onChange={e => update({ [colorName]: e.target.value })}
	        />
	        {colorName}
	      </label>
	    )}
	  </Consumer>
	);
}

const ColorDisplay = function() {
	return (
	  <Consumer>
	    {({ colors: { red, green, blue } }) => (
	      <div
	        style={{
	          backgroundColor: `rgb(${red}, ${green}, ${blue})`,
	          height: 100,
	          width: 100
	        }}
      	/>
    	)}
	  </Consumer>
	);
}

const RgbDisplay = function() {
	return (
	  <Consumer>
	    {({ colors: { red, green, blue } }) => (
	      <p>
	        rgb({red}, {green}, {blue})
	      </p>
	    )}
	  </Consumer>
	);
}

const HexDisplay = function() {
	const toHex = num => `0${parseInt(num).toString(16)}`.slice(-2).toUpperCase();
	const rgbToHex = ({ red, green, blue }) =>
	  "#" + toHex(red) + toHex(green) + toHex(blue);
	return (
	  <Consumer>{({ colors }) => <p>{rgbToHex({ ...colors })}</p>}</Consumer>
	);
};

const ColorSelectorUI = function() {
	return (
	  <main>
	    <section>
	      <ColorInput colorName="red" />
	      <ColorInput colorName="green" />
	      <ColorInput colorName="blue" />
	    </section>
	    <section>
		      <ColorDisplay />
	      <RgbDisplay />
	      <HexDisplay />
	    </section>
	  </main>
	);
}

class ColorSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      red: 240,
      green: 210,
      blue: 110
    };
    this.update = color => this.setState(color);
  }

  render() {
    const { update } = this;
    const colors = this.state;
    return (
      <Provider value={{ colors, update }}>
        <ColorSelectorUI />
      </Provider>
    );
  }
}

export default ColorSelector;
