import React, { Component } from 'react'
import ItemWishlist from './ItemWishlist'

export default class Wishlist extends Component {

	render() {

		const productsWishlist = this.props.wishlist.map((item) => {
			return (
				<ItemWishlist key={`wishitem-${item.id}`} item={item} addToCart={this.props.addToCart} />
			)
		});

		return (
			<div className={`wishlist ${this.props.wishlistOpen ? 'active' : ''}`}>
				<div className="wishlist-header">
					<h2>My wishlist</h2>
					<div className="cross-icon" onClick={() => this.props.handleWishlistClose()}></div>
				</div>
				{productsWishlist}
			</div>
		)
	}
}
