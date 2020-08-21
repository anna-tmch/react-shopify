import React, { Component } from 'react'

export default class Footer extends Component {
	render() {
		const { name } = this.props.shop
		return (
			<div className="footer-wrapper">
				<div className="container">
					{name}
				</div>
			</div>
		)
	}
}
