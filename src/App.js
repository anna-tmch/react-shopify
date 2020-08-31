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

		let checkoutId = localStorage.getItem('checkoutId')

		if (!checkoutId) {
			this.props.client.checkout.create().then((response) => {
				this.setState({
					checkout: response,
				});
				localStorage.setItem('checkoutId', this.state.checkout.id);
			});
		} else {
			this.props.client.checkout.fetch(checkoutId).then((response) => {
				this.setState({
					checkout: response,
				})
			});
		}
	}

	addToCart = ((id, quantity) => {

		const checkout = this.state.checkout.id;
		let variantId = id;
		const items = [{ variantId, quantity: parseInt(quantity, 10) }];
		return this.props.client.checkout.addLineItems(checkout, items).then(response => {
			this.setState({
				checkout: response,
				cartOpen: true
			});
		});

	});

	removeItem = ((id) => {
		const checkoutId = this.state.checkout.id;
		let lineItemId = id;
		return this.props.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(response => {
			this.setState({
				checkout: response,
			});
		});
	})

	removeAll = () => {
		const checkoutId = this.state.checkout.id;
		let lineItems = this.state.checkout.lineItems;
		let lineItemsToRemove = [];

		lineItems.forEach(item => {
			lineItemsToRemove.push(item.id)
		});

		return this.props.client.checkout.removeLineItems(checkoutId, lineItemsToRemove).then(response => {
			this.setState({
				checkout: response,
			});
		});
	}

	handleClick = () => {
		this.setState((prevState) => ({
			cartOpen: !prevState.cartOpen,
		}));
	};

	render() {
		const { products, shop, cartOpen, checkout, currentPage, productsPerPage, loading, client } = this.state;

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

		const totalQuantity = () => {
			let result = checkout.lineItems.reduce((accumulator, item) => {
				return accumulator + item.quantity;
			}, 0)
			return result;
		}

		return (
			<div>
				<div className="menu-wrapper">
					<div className="container">
						<div className="menu-inner">
							<div className="cart-icon" onClick={this.handleClick}>
								{checkout.lineItems.length > 0 ? <span>{totalQuantity()}</span> : null}
							</div>
						</div>
					</div>
				</div>
				<div className="cover-wrapper">	<h1>{shop.name}</h1>
				</div>
				<div className="container">
					<div>
						<Cart checkout={checkout} cartOpen={cartOpen} shop={shop} removeItem={this.removeItem} removeAll={this.removeAll} addToCart={this.addToCart} handleClick={this.handleClick} />
					</div>
					<ProductList products={currentProducts} loading={loading} addToCart={this.addToCart} client={this.props.client} shop={shop} />
					<Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} />
				</div>
				<Footer shop={shop} />
			</div>
		);
	}
}

export default App;
