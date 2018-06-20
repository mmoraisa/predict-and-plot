import React, { Component } from 'react'
import './SeriesInput.css'

class SeriesInput extends Component {

    handleOnChangeSeries = evt => {
        const { onChangeSeries } = this.props
        let val = evt.target.value

        try {
            val = JSON.parse(val)
            onChangeSeries(val)
        } catch(e) {}
    }

    render () {

        const {
            name,
            placeholder = [],
            style = []
        } = this.props

        return (
            <div className="series-input" style={ style }>
                <span className="name">{ name }</span>
                <div className="value">
                    <input
                        ref={ ref => this.inputSeries = ref }
                        type="text"
                        defaultValue={ `[${ placeholder.join(',') }]` }
                        onChange={ this.handleOnChangeSeries }
                    />
                </div>
            </div>
        )
    }
}

export default SeriesInput