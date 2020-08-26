import React from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import Pagination from './components/Pagination';
import Footer from "./components/Footer";
import Cart from "./components/Cart"

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			products: [],
			loading: false,
			currentPage: 1,
			productsPerPage: 6,
			shop: {},
			checkout: { lineItems: [] },
			cartOpen: false
		};
	}

	componentDidMount() {
		this.setState({
			loading: true,
		});

		this.props.client.product.fetchAll().then((response) => {
			this.setState({
				products: response,
				loading: false,
			});
		});

		this.props.client.shop.fetchInfo().then((response) => {
			this.setState({
				shop: response,
			});
		});

		this.props.client.checkout.create().then((response) => {
			console.log('checkout', response);
			this.setState({
				checkout: response,
			});
		});

	}

	addToCart = ((id, quantity) => {

		const checkout = this.state.checkout.id;
		console.log(id, quantity);
		let variantId = id;
		const items = [{ variantId, quantity: parseInt(quantity, 10) }];
		console.log(items)

		return this.props.client.checkout.addLineItems(checkout, items).then(response => {
			this.setState({
				checkout: response,
			});
		});

	});

	render() {
		const { products, shop, currentPage, productsPerPage, loading } = this.state;

		const indexOfLastProduct = currentPage * productsPerPage;
		const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
		const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

		const paginate = pageNum => this.setState({
			currentPage: pageNum
		});

		const nextPage = ((currentPage, pageNumbers) => {
			if (currentPage === pageNumbers.length) {
				return false
			} else {
				this.setState({
					currentPage: currentPage + 1
				});
			}
		});

		const prevPage = ((currentPage) => {
			if (currentPage === 1) {
				return false
			} else {
				this.setState({
					currentPage: currentPage - 1
				});
			}
		});

		return (
			<div>
				<div className="cover-wrapper">	<h1>{shop.name}</h1>
				</div>
				<div className="container">
					<div>
						<Cart checkout={this.state.checkout} cartOpen={this.state.cartOpen} addToCart={this.addToCart} />
					</div>
					<ProductList products={currentProducts} loading={loading} addToCart={this.addToCart} client={this.props.client} />
					<Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} />
				</div>
				<Footer shop={shop} />
			</div>
		);
	}
}

export default App;
