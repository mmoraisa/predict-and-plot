import React, { Component } from 'react'
import './SeriesInput.css'

class SeriesInput extends Component {

    render () {

        const {
            name,
            placeholder = []
        } = this.props

        return (
            <div className="series-input">
                <span className="name">{ name }</span>
                <div className="value">
                    <input
                        ref={ ref => this.inputSeries = ref }
                        type="text"
                        defaultValue={ `[${ placeholder.join(',') }]` }
                    />
                </div>
            </div>
        )
    }
}

export default SeriesInput