import React, { Component } from 'react'

export default class Cart extends Component {
	render() {

		const { checkout, cartOpen, shop } = this.props;

		const cart = checkout.lineItems.map((item) => {
			return <div className="cart-line-item" key={item.id.toString()}>
				<img src={item.variant.image.src} />
				<div>
					<div className="cart-item-title">{item.title}</div>
					<span className="cart-item-quantity">{`x${item.quantity} `}</span>
					<div className="cart-item-price">{(item.variant.price) * (item.quantity)} {shop.currencyCode}</div>
					<div onClick={() => this.props.removeItem(item.id.toString())} className="label-remove">Remove</div>
				</div>
			</div>
		})

		return (
			<div className={`cart ${cartOpen ? 'active' : ''}`}>
				<div className="cart-header">
					<h2>My cart</h2>
					<div className="cross-icon" onClick={() => this.props.handleClick()}></div>
				</div>
				{cart.length > 0 ?
					<div className="cart-content"> {cart}
					</div> : <div className="cart-empty"> Cart is empty... </div>}
				{checkout.totalPrice > 0 ?
					<div className="cart-footer">
						<div className="cart-total">Total: 	{`${checkout.totalPrice} ${shop.currencyCode}`}</div>
						<div className="cart-checkout">	<a href={checkout.webUrl}>Checkout</a></div>
					</div> : null}

			</div>
		)
	}
}
