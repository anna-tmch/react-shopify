import React from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import Pagination from './components/Pagination';
import Footer from "./components/Footer";
import Cart from "./components/Cart"
import Wishlist from "./components/Wishlist";
import Icon from "./components/IconHeart"

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
			wishlist: [],
			cartOpen: false,
			wishlistOpen: false,
			sortedByPrice: false,
			sortedByTitle: false,
			sortedByPriceDesc: '',
			sortedByTitleDesc: '',
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

	moveToCart = (() => {
		const wishlist = this.state.wishlist;
		const checkout = this.state.checkout.id;

		const items = wishlist.map((item) => {
			return { variantId: item.selectedVariant.id, quantity: 1 }
		})

		return this.props.client.checkout.addLineItems(checkout, items).then(response => {
			this.setState({
				checkout: response,
				cartOpen: true,
				wishlist: []
			});
		});
	})

	addToWishList = ((title, selectedVariant) => {
		const wishlist = this.state.wishlist;
		const wishItem = [{ title: title, selectedVariant: selectedVariant }];

		if (wishlist.some(item => item.selectedVariant === selectedVariant)) {
			const newWishlist = wishlist.filter((item) => item.selectedVariant !== selectedVariant)
			this.setState({
				wishlist: newWishlist,
			})
		} else {
			this.setState({
				wishlist: [...wishlist, { title: title, selectedVariant: selectedVariant, quantity: 1 }],
				wishlistOpen: true
			})
		}
	})

	removefromWishlist = ((id) => {
		const wishlist = this.state.wishlist;

		const newWishlist = wishlist.filter((item) => item.selectedVariant.id !== id)
		this.setState({
			wishlist: newWishlist,
		})
	})

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

	emptyWishlist = () => {
		this.setState({
			wishlist: [],
		})
	}

	toggleCart = () => {
		this.setState((prevState) => ({
			cartOpen: !prevState.cartOpen,
		}));
	};

	toggleWishlist = () => {
		this.setState((prevState) => ({
			wishlistOpen: !prevState.wishlistOpen,
		}));
	};

	sortByPrice = () => {
		this.setState((prevState) => ({
			products: prevState.products.sort((a, b) => (
				this.state.sortedByPrice ? (a.variants[0].price - b.variants[0].price) : (b.variants[0].price - a.variants[0].price)
			)),
			sortedByPrice: !prevState.sortedByPrice,
			sortedByPriceDesc: this.state.sortedByPrice,
			sortedByTitleDesc: '',
			sortedByTitle: false
		}));
	};

	sortByTitle = () => {
		this.setState((prevState) => ({
			products: prevState.products.sort((a, b) => (
				this.state.sortedByTitle ? (b.title.localeCompare(a.title)) : (a.title.localeCompare(b.title))
			)),
			sortedByTitle: !prevState.sortedByTitle,
			sortedByTitleDesc: this.state.sortedByTitle,
			sortedByPriceDesc: '',
			sortedByPrice: false
		}));
	};

	render() {
		const { products, shop, cartOpen, checkout, currentPage, productsPerPage, loading, wishlist } = this.state;

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
							<Icon fill={"#fff"} stroke="#fff" toggleWishlist={this.toggleWishlist} />
							<div className="cart-icon" onClick={this.toggleCart}>
								{checkout.lineItems.length > 0 ? <span>{totalQuantity()}</span> : null}
							</div>
						</div>
					</div>
				</div>
				<div className="cover-wrapper">	<h1>{shop.name}</h1>
				</div>
				<div className="container">
					<div>
						<Cart checkout={checkout} cartOpen={cartOpen} shop={shop} removeItem={this.removeItem} removeAll={this.removeAll} addToCart={this.addToCart} toggleCart={this.toggleCart} />
					</div>
					<div className="btn-group sorting">
						sort:
						<button onClick={this.sortByPrice} className={`btn ${this.state.sortedByPrice ? "asc" : ""} ${this.state.sortedByPriceDesc ? "desc" : ""}`} >Price </button>
						<button onClick={this.sortByTitle} className={`btn ${this.state.sortedByTitle ? "asc" : ""} ${this.state.sortedByTitleDesc ? "desc" : ""}`} >Title </button>
					</div>
					<Wishlist emptyWishlist={this.emptyWishlist} wishlist={wishlist} wishlistOpen={this.state.wishlistOpen} client={this.props.client} addToCart={this.addToCart} moveToCart={this.moveToCart} removefromWishlist={this.removefromWishlist} client={this.props.client} shop={shop} toggleWishlist={this.toggleWishlist} />
					<ProductList wishlist={wishlist} products={currentProducts} loading={loading} addToCart={this.addToCart} addToWishList={this.addToWishList} client={this.props.client} shop={shop} />
					<Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} />
				</div>
				<Footer shop={shop} />
			</div>
		);
	}
}

export default App;
