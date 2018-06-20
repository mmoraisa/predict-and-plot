import React, { Component } from 'react'
import './NumericInput.css'

class NumericInput extends Component{

    state = {
        value: null
    }

    componentDidMount () {
        const { value } = this.props
        this.setState({ value })
    }

    handleValueChanged = evt => {
        const { onChangeValue } = this.props
        const value = evt.target.value

        this.setState({ value })

        if(value.length > 0)
            onChangeValue(value)
    }

    render () {
        const { name, value } = this.props

        return (
            <div className="numeric-input">
                <label>{ name }</label>
                <input
                    type="number"
                    onChange={ this.handleValueChanged }
                    defaultValue={ value } />
            </div>
        )
    }
}

export default NumericInput