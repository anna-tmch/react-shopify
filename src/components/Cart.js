import React, { Component } from 'react'

export default class Cart extends Component {
	render() {

		const { checkout, cartOpen } = this.props;

		const cart = checkout.lineItems.map((item) => {
			return <div>
				{`${item.title} ${item.quantity}`}
			</div>
		})

		return (
			<div className={`cart ${cartOpen ? 'active' : ''}`}>
				{cart}
				Total price: {checkout.totalPrice}
			</div>
		)
	}
}
