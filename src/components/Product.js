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

		const selectedVariant = this.props.client.product.helpers.variantForOptions(this.props.product, selectedOptions)
		this.setState({
			selectedVariant: selectedVariant
		})
	};

	increase = () => {
		this.setState(prevState => ({ quantity: +prevState.quantity + 1 }))
	}

	decrease = () => {
		if (this.state.quantity > 1) {
			this.setState(prevState => ({ quantity: +prevState.quantity - 1 }))
		}
	}

	render() {
		const { title, images, variants, id, options, description } = this.props.product;
		const { shop } = this.props;
		let quantity = this.state.quantity;
		let variant = this.state.selectedVariant;

		const imagesList = images.map((image, index) => {
			if (index === 0) { // grab only first image
				return (
					<div key={image.src} className="product-image" >
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
					<h4 className="product-title">
						{title}
					</h4>
					<p className="products-desc">{description}</p>
					<div className="select-wrapper">
						<VariantSelector options={options} handleSelectChange={this.handleSelectChange} key={`${options[0].id}`} />
					</div>
					<div className="product-prq">
						<span className="product-price">	{parseInt(variant.price)} {shop.currencyCode}</span>
						<div className="product-quantity">
							<button className="decrease-quantity" onClick={this.decrease}>&ndash;</button>
							<input
								type="number"
								name="quantity"
								value={this.state.quantity}
								onChange={this.handleChange}
								min="1"
							/>
							<button className="increase-quantity" onClick={this.increase}>+</button>
						</div>
					</div>
					<button className="button buy-button" onClick={() => this.props.addToCart(variant.id, quantity)}> Add to cart </button>
				</div>
			</div>
		);
	}
}

export default Product;
