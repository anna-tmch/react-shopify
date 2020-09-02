import React, { Component } from 'react'

export default class ItemWishlist extends Component {
	render() {
		const { item } = this.props;
		return (
			<div className="wish-item">
				{item.title}
			</div>
		)
	}
}
