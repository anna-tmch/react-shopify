import React, { Component } from 'react'

export default class VariantSelector extends Component {

	render() {
		const { options } = this.props;

		const variantSelector = options.map((option) => {
			if (option.values.length > 1) {
				return (
					<select name={option.name} key={option.name} onChange={(event) => this.props.handleSelectChange(event)}>
						{option.values.map((value) => {
							return (
								<option value={value} key={`${option.id}-${value}`}> {`${value}`}</option>
							)
						})}
					</select>
				);
			}
		})

		return (
			<div>
				{variantSelector}
			</div>
		)
	}
}
