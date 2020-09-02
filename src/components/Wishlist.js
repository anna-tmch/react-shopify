import React, { Component } from 'react'
import ItemWishlist from './ItemWishlist'

export default class Wishlist extends Component {

	constructor() {
		super();
		this.state = {
			wishedProducts: []
		};
	}

	componentDidUpdate(prevProps) {
		const wishlist = this.props.wishlist;
		let ids = wishlist.map(item => item.id);
		if (this.props.wishlist !== prevProps.wishlist) {
			if (this.props.wishlist.length > 0) {
				this.props.client.product.fetchMultiple(ids).then((response) => {
					this.setState({
						wishedProducts: response
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
				<ItemWishlist key={`wishitem-${item.id}`} item={item} />
			)
		});

		return (
			<div className="wishlist">
				{productsWishlist}
			</div>
		)
	}
}
