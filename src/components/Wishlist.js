import React, { Component } from 'react'
import ItemWishlist from './ItemWishlist'

export default class Wishlist extends Component {

	render() {

		const productsWishlist = this.props.wishlist.map((item) => {
			return (
				<ItemWishlist key={`wishitem-${item.selectedVariant.id}`} item={item} addToCart={this.props.addToCart} removefromWishlist={this.props.removefromWishlist} shop={this.props.shop} />
			)
		});

		let total = 0;
		this.props.wishlist.forEach(element => {
			let price = Number(element.selectedVariant.price);
			total = price + total;
		})

		return (
			<div className={`wishlist ${this.props.wishlistOpen ? 'active' : ''}`}>
				<div className="wishlist-header">
					<h2>My wishlist</h2>
					<div className="cross-icon" onClick={() => this.props.toggleWishlist()}></div>
				</div>
				{productsWishlist.length > 0 ?
					<div className="wishlist-content">
						{productsWishlist}
						<div onClick={() => this.props.emptyWishlist()} className="label-remove-all" >clear wishlist</div>
					</div> : <div className="wishlist-empty"> Wishlist is empty... </div>}
				{total > 0 ?
					<div className="wishlist-footer">
						<div className="wishlist-total">Total: {`${Number(total)} ${this.props.shop.currencyCode}`}</div>
						<div className="wishlist-buy" onClick={() => this.props.moveToCart()}><span>Move to cart</span></div>
					</div> : null}
			</div>
		)
	}
}
