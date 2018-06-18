import React, { Component } from 'react'
import './Main.css'

import SeriesInput from '../components/SeriesInput'
import Button from '../components/PnPButton'

const placeholderSerieX = [1,2,3,4,5];
const placeholderSerieY = [5,32,6,1,2];

class Main extends Component{

    state = {
        seriesX: [],
        seriesY: [],
    }

    componentDidMount () {
        this.setState({
            seriesX: placeholderSerieX,
            seriesY: placeholderSerieY,
        })
    }

    handleChangeSeriesX = seriesX => {
        this.setState({
            seriesX
        })
    }

    handleChangeSeriesY = seriesY => {
        this.setState({
            seriesY
        })
    }

    render () {
        return (
            <div>
                <h1>Predict&Plot</h1>
                <div className="content">
                    <section className="series">
                        <SeriesInput
                            name="Serie X"
                            placeholder={ placeholderSerieX }
                            onChangeSeries={ this.handleChangeSeriesX }
                            />
                        <SeriesInput
                            name="Serie Y"
                            placeholder={ placeholderSerieY }
                            onChangeSeries={ this.handleChangeSeriesY }
                            />
                        <div className="series-action">
                            <Button>
                                Treinar Modelo
                            </Button>
                            <img src="img/loading.svg" />
                        </div>
                    </section>
                    <section className="function"></section>
                </div>
            </div>
        )
    }
}

export default Main