import React, { Component } from "react";
import VariantSelector from "./VariantSelector"

class Product extends Component {
	constructor(props) {
		super(props);

		let defaultOption = {}

		this.props.product.options.forEach((option) => {
			defaultOption[option.name] = option.values[0].value;
		});

		this.state = {
			quantity: 1,
			selectedOptions: defaultOption,
			selectedVariant: this.props.product.variants[0]
		}
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleSelectChange = (event) => {

		const { name, value } = event.target;
		let selectedOptions = this.state.selectedOptions;

		selectedOptions[name] = value;
		console.log(selectedOptions);

		const selectedVariant = this.props.client.product.helpers.variantForOptions(this.props.product, selectedOptions)
		this.setState({
			selectedVariant: selectedVariant
		})
	};

	render() {
		const { title, images, variants, id, options } = this.props.product;
		const { shop } = this.props;
		let quantity = this.state.quantity;
		let variant = this.state.selectedVariant;

		const imagesList = images.map((image, index) => {
			if (index === 0) { // grab only first image
				return (
					<div key={image.src} className="product-image" >
						{/* <img src={image.src} /> */}
						<img src={variant.image.src} />
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

		return (
			<div className="product-wrapper">
				<div className="product-card">
					{imagesList}
					<div className="product-title">
						<h4>{title}</h4>
						<p>	{variant.price} {shop.currencyCode}</p>
						<div><VariantSelector options={options} handleSelectChange={this.handleSelectChange} key={`${options[0].id}`} /></div>

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
					<button className="button buy-button" onClick={() => this.props.addToCart(variant.id, quantity)}> Add to cart </button>

				</div>
			</div>
		);
	}
}

export default Product;
