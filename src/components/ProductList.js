import React, { Component } from "react";
import Product from "./Product";

class ProductList extends Component {
  render() {
    const productList = this.props.products.map((product) => {
      return <Product key={product.id} product={product} />;
    });
    return <div>{productList}</div>;
  }
}

export default ProductList;
