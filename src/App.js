import React from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import Pagination from './components/Pagination'

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			products: [],
			loading: false,
			currentPage: 1,
			productsPerPage: 4,
			shop: {},
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
	}

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
			<div className="container">
				<h1>{shop.name}</h1>
				<ProductList products={currentProducts} loading={loading} />
				<Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} currentPage={currentPage} />
			</div>
		);
	}
}

export default App;
