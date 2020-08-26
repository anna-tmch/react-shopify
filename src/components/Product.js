import React, { Component } from "react";

class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: 1
		}
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	render() {
		const { title, images, variants, id, options } = this.props.product;
		let quantity = this.state.quantity

		const imagesList = images.map((image, index) => {
			if (index === 0) { // grab only first image
				return (
					<div key={image.src} className="product-image" >
						<img src={image.src} />
					</div>
				)
			}
		});

		const variantsList = variants.length > 1 ? variants.map((variant) => {
			return (
				<div key={variant.id}>
					{variant.price}, {variant.title}
				</div>
			)
		}) : null;

		const variantSelector = options.map((option) => {
			if (option.values.length > 1) {
				return (
					<select name={option.name} key={option.id} onChange={this.handleOptionChange}>
						{option.values.map((value) => {
							return (
								<option value={value} key={`${option.id}-${value}`}> {`${value}`}</option>
							)
						})}
					</select>
				);
			}
		})

		return (
			<div className="product-wrapper">
				<div className="product-card">
					{imagesList}
					<div className="product-title">
						<h3>{title}</h3>
					</div>
					<label className="product-quantity">
						Quantity
						<input
							type="number"
							name="quantity"
							value={this.state.quantity}
							onChange={this.handleChange}
							min="1"
						/>
					</label>
					<button className="button buy-button" onClick={() => this.props.addToCart(variants[0].id, quantity)}> Add to cart </button>
					<div>{variantSelector}</div>
				</div>
			</div>
		);
	}
}

export default Product;
