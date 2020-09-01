import React, { Component } from 'react'
import Product from "./Product"

export default class Wishlist extends Component {

	constructor() {
		super();
		this.state = {
			wishedProducts: []
		};
	}

	componentDidUpdate(prevProps) {
		const updatedList = [];
		if (this.props.wishlist !== prevProps.wishlist) {
			this.props.wishlist.forEach(item => {
				this.props.client.product.fetch(item).then((response) => {
					updatedList.push(response);
				}).then(() => {
					this.setState({
						wishedProducts: updatedList
					});
				});
			})
		}
	}

	render() {

		const productsWishlist = this.state.wishedProducts.map((item) => {
			return (
				<div>{item.title}</div>
			)
		});

		return (
			<div>
				{productsWishlist}
			</div>
		)
	}
}
