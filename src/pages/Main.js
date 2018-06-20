import React, { Component } from 'react'
import './Main.css'

import { predict, train } from '../helpers/Intelligence'
import { delay } from '../helpers/Utility'

import SeriesInput from '../components/SeriesInput'
import Button from '../components/PnPButton'

const placeholderSerieX = [1,2,3,4,5];
const placeholderSerieY = [5,32,6,1,2];

class Main extends Component{

    state = {
        seriesX: [],
        seriesY: [],
        training: false
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

    handleTrain = () => {
        const { seriesX, seriesY } = this.state

        train(seriesX,seriesY)
            .then(console.log)

        delay(3000)
            .then(() => {
                this.setState({
                    training: false
                })
            })
    }

    handlePredict = () => {
        predict()
    }

    render () {

        const { training } = this.state

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
                        <div className={ "series-action" + ( training ? ' loading ' : '' ) }>
                            <Button
                                onClick={ this.handleTrain }
                                disabled={ training } >
                                Train Model
                            </Button>
                            <img src="img/loading.svg" />
                        </div>
                    </section>
                    <section className="function">
                        <Button
                            onClick={ this.handlePredict } >
                            Predict
                        </Button>
                    </section>
                </div>
            </div>
        )
    }
}

export default Main