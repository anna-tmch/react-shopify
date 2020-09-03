import React, { Component } from 'react'

export default class ItemWishlist extends Component {
	render() {
		const { item } = this.props;
		return (
			<div className="wish-item">
				<p>	{item.title}</p>
				<p>	{item.selectedVariant.title === "Default Title" ? '' : item.selectedVariant.title}</p>
				<img src={item.selectedVariant.image.src} />
				<button onClick={() => this.props.addToCart(item.selectedVariant.id, 1)}>Add to cart</button>
			</div>
		)
	}
}
