/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import React from "react";

class Menu extends React.Component {
	/**
	 * Main constructor for the Menu Class
	 * @memberof Menu
	 */
	constructor() {
		super();
		this.state = {
			showingSearch: false,
			results: [], // to store the results from server for given string
			inputStr: "", // to store the string inputted by user (conditionally display the text)
		};
	}

	/**
	 * Shows or hides the search container
	 * @memberof Menu
	 * @param e [Object] - the event from a click handler
	 */
	showSearchContainer(e) {
		e.preventDefault();
		this.setState({
			showingSearch: !this.state.showingSearch,
		});
	}

	/**
	 * Calls upon search change
	 * @memberof Menu
	 * @param e [Object] - the event from a text change handler
	 */
	onSearch(e) {
		// Start Here
		const val = e.target.value;
		this.setState({ inputStr: val });
		// ...
		if (val.length) {
			fetch("http://localhost:3035/search/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: val,
				}),
			})
				.then((res) => res.json())
				.then((val) => {
					console.log(val);
					this.setState({ results: val.res });
				});
		}
	}

	/**
	 * Renders the default app in the window, we have assigned this to an element called root.
	 *
	 * @returns JSX
	 * @memberof App
	 */
	// function to render list
	renderList() {
		// if user input is empty
		if (this.state.inputStr.length < 1) {
			return (
				<p className="notification-text">
					Please enter the text to search
				</p>
			);
		}
		// if there are are no result for given input
		if (this.state.results.length === 0) {
			return (
				<p className="notification-text">
					No result for "{this.state.inputStr}"
				</p>
			);
		}
		// displaying results for given string
		return (
			<>
				{this.state.results.length &&
					this.state.results.map((item, index) => {
						return (
							<div className="prod-container">
								<img
									src={`../${item.picture}`}
									alt="Product Image"
									className="prod-image"
								/>
								<div className="prod-detail">
									<h3 className="prod-name">{item.name}</h3>
									<div className="prod-tags">
										{item.tags.map((item) => (
											<p className="prod-tag">
												{`${
													item
														.charAt(0)
														.toUpperCase() +
													item.slice(1)
												}, `}
											</p>
										))}
									</div>
									<h4 className="prod-price">
										${item.price}
									</h4>
								</div>
							</div>
						);
					})}
			</>
		);
	}
	render() {
		return (
			<header className="menu">
				<div className="menu-container">
					<div className="menu-holder">
						<h1>ELC</h1>
						<nav>
							<a href="#" className="nav-item">
								HOLIDAY
							</a>
							<a href="#" className="nav-item">
								WHAT'S NEW
							</a>
							<a href="#" className="nav-item">
								PRODUCTS
							</a>
							<a href="#" className="nav-item">
								BESTSELLERS
							</a>
							<a href="#" className="nav-item">
								GOODBYES
							</a>
							<a href="#" className="nav-item">
								STORES
							</a>
							<a href="#" className="nav-item">
								INSPIRATION
							</a>

							<a
								href="#"
								onClick={(e) => this.showSearchContainer(e)}
							>
								<i className="material-icons search">search</i>
							</a>
						</nav>
					</div>
				</div>
				<div
					className={
						(this.state.showingSearch ? "showing " : "") +
						"search-container"
					}
				>
					<input type="text" onChange={(e) => this.onSearch(e)} />
					<a href="#" onClick={(e) => this.showSearchContainer(e)}>
						<i className="material-icons close">close</i>
					</a>
					{this.renderList()}
				</div>
			</header>
		);
	}
}

// Export out the React Component
module.exports = Menu;
