import React, { Component } from 'react'

export default class Pagination extends Component {
	render() {

		const { productsPerPage, totalProducts, paginate, nextPage, prevPage, currentPage } = this.props;
		const pageNumbers = [];

		for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
			pageNumbers.push(i)
		}

		const pageNumbersList = pageNumbers.map(num => (
			<li className={`page-item page-num ${currentPage === num ? "active" : ""}`} key={num} >
				<a onClick={() => paginate(num)} href="#" className="page-link"> {num} </a>
			</li>
		));

		return (
			<nav>
				<ul className="pagination">
					<li className="page-item next">
						<a className="page-link" href="#" onClick={() => prevPage(currentPage)}>Previous</a>
					</li>
					{pageNumbersList}
					<li className="page-item prev">
						<a className="page-link" href="#" onClick={() => nextPage(currentPage, pageNumbers)}>Next</a>
					</li>
				</ul>
			</nav>
		)
	}
}
