import React, { Component } from 'react'

export default class ItemWishlist extends Component {
	render() {
		const { item } = this.props;
		return (
			<div className="wish-item">
				<img src={item.selectedVariant.image.src} />
				<div className="wish-item-info">
					<h3>{item.title} </h3>
					{item.selectedVariant.title === "Default Title" ? '' : <h4>	{item.selectedVariant.title}</h4>}
					<div className="wish-item-price">{Number(item.selectedVariant.price)} {this.props.shop.currencyCode}</div>
					<div className="wish-item-controls">
						<div className="label-remove" onClick={() => this.props.removefromWishlist(item.selectedVariant.id, 1)}>Remove</div>
						<div className="label-add" onClick={() => this.props.addToCart(item.selectedVariant.id, 1)}>Add to cart</div>
					</div>
				</div>
			</div>
		)
	}
}
