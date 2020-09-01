import React, { Component } from 'react'

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
			if (this.props.wishlist.length > 0) {
				this.props.wishlist.forEach(item => {
					this.props.client.product.fetch(item).then((response) => {
						updatedList.push(response);
					}).then(() => {
						this.setState({
							wishedProducts: updatedList
						});
					});
				})
			} else {
				this.setState({
					wishedProducts: []
				});
			}
		}
	}

	render() {

		const productsWishlist = this.state.wishedProducts.map((item) => {
			return (
				<div key={`wishitem-${item.id}`}>{item.title}</div>
			)
		});

		return (
			<div>
				{productsWishlist}
			</div>
		)
	}
}
