import React, { Component } from "react";
import Product from "./Product";

class ProductList extends Component {
	render() {
		const { products, loading, shop, client, wishlist } = this.props;

		if (loading) {
			return (
				<div>
					<h1> Loading...</h1>
				</div>
			);
		}

		const productList = products.map((product) => {
			return <Product key={product.id} wishlist={wishlist} product={product} addToCart={this.props.addToCart} addToWishList={this.props.addToWishList} client={client} shop={shop} />;
		});

		return <div className="product-list">{productList}</div>;
	}
}

export default ProductList;
