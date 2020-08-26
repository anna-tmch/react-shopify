import React, { Component } from 'react'

export default class Cart extends Component {
	render() {

		const { checkout, cartOpen, shop } = this.props;

		const cart = checkout.lineItems.map((item) => {
			return <div className="line-item-wrapper">
				<img src={item.variant.image.src} />

				<div>
					<h4>{item.title} </h4>
					<div>Quantity: {item.quantity}</div> <div>{item.variant.price}{shop.currencyCode}</div>
				</div>

			</div>
		})

		return (
			<div className={`cart ${cartOpen ? 'active' : ''}`}>
				{cart.length > 0 ?
					<div> {cart}
						<div className="cart-total">
							Total: 	{`${checkout.totalPrice} ${shop.currencyCode}`}
							<p>	<a href={checkout.webUrl}>Checkout</a></p>
						</div>
					</div> : <div> Your cart is empty... </div>}
			</div>
		)
	}
}
