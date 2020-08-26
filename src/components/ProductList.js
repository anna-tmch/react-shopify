import React, { Component } from "react";
import Product from "./Product";

class ProductList extends Component {
	render() {
		const { products, loading } = this.props;

		if (loading) {
			return (
				<div>
					<h1> Loading...</h1>
				</div>
			);
		}

		const productList = products.map((product) => {
			return <Product key={product.id} product={product} addToCart={this.props.addToCart} client={this.props.client} />;
		});

		return <div className="product-list">{productList}</div>;
	}
}

export default ProductList;
