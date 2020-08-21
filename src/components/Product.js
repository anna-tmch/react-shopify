import React, { Component } from "react";

class Product extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>{this.props.product.title}</div>;
  }
}

export default Product;
