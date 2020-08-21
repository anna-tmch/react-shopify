import React from "react";
import "./App.css";
import ProductList from "./components/ProductList";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      shop: {},
    };
  }

  componentWillMount() {
    this.props.client.product.fetchAll().then((response) => {
      this.setState({
        products: response,
      });
    });

    this.props.client.shop.fetchInfo().then((response) => {
      this.setState({
        shop: response,
      });
    });
  }

  render() {
    return (
      <div className="container">
        <h1>{this.state.shop.name}</h1>
        <ProductList products={this.state.products} />
      </div>
    );
  }
}

export default App;
