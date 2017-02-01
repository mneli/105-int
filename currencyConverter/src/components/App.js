import React, { Component } from 'react';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = { renderMode: "def", input: 0 };
	}

	handleInput(input) {
		this.setState({ input })
	}

	renderConverter(rate) {
		return (
			<div className="container">
				<div className="converter">
					<h1>Currency Converter</h1>
					<h3>Convert CHF-Swiss Franc to {this.state.renderMode}</h3>
					<p className>
						<input
							value={this.state.input}
							className={isNaN(this.state.input) ? "invalid-input" : "valid-input"}
							onChange={
								(event) => {
									this.handleInput(event.target.value)
								}
							} /> = {isNaN(this.state.input) ? 0 : Math.round((this.state.input * rate) * 100) / 100} {this.state.renderMode}
					</p>
				</div>
				<div className="btn-back" onClick={() => this.setState({ renderMode: "def", input: 0 })}>Back to currency menu</div>
			</div>
		);
	}

	renderDefault() {
		return (
			<div className="container">
				<h1>Currency Converter</h1>
				<div>
					<div className="currency-box" onClick={() => this.setState({ renderMode: "US-Dollar" })}>
						<i className="fa fa-usd fa-5x"></i><br />
						US-Dollar
					</div>
					<div className="currency-box" onClick={() => this.setState({ renderMode: "EU-Euro" })}>
						<i className="fa fa-eur fa-5x"></i><br />
						EU-Euro
					</div>
				</div>
				<div>
					<div className="currency-box" onClick={() => this.setState({ renderMode: "Japan-Yen" })}>
						<i className="fa fa-jpy fa-5x"></i><br />
						UK-Pound
					</div>
					<div className="currency-box" onClick={() => this.setState({ renderMode: "UK-Pound" })}>
						<i className="fa fa-gbp fa-5x"></i><br />
						Japan-Yen
					</div>
				</div>
			</div>
		);
	}

	render() {
		switch (this.state.renderMode) {
			case 'US-Dollar':
				return this.renderConverter(1.00711);
				break;
			case 'EU-Euro':
				return this.renderConverter(0.934918);
				break;
			case 'Japan-Yen':
				return this.renderConverter(113.973);
				break;
			case 'UK-Pound':
				return this.renderConverter(0.795517);
				break;
			default:
				return this.renderDefault()
		}
	}
}

export default App;
