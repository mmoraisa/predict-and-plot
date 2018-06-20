import React, { Component } from 'react'
import './Main.css'

import { predict, train } from '../helpers/Intelligence'
import { delay } from '../helpers/Utility'

import SeriesInput from '../components/SeriesInput'
import NumericInput from '../components/NumericInput'
import Button from '../components/PnPButton'
import Chart from '../components/Chart'

const placeholderSerieX = [1,2,3,4,5];
const placeholderSerieY = [5,32,6,45,2];

class Main extends Component{

    state = {
        chartData: [],
        predictionData: [],
        seriesX: [],
        seriesY: [],
        seriesXForPrediction: [],
        seriesYForPrediction: [],
        training: false,
        trainingLoop: 0,
        interactions: 10
    }

    componentDidMount () {
        this.setState({
            seriesX: placeholderSerieX,
            seriesY: placeholderSerieY,
        })
        this.drawChart(placeholderSerieX,placeholderSerieY)
    }

    drawChart = (seriesX = this.state.seriesX, seriesY = this.state.seriesY) => {
        if(seriesX.length !== seriesY.length)
            return false

        let chartData = []
        for(let i = 0; i < seriesX.length; i++)
            chartData.push({ x: seriesX[i], y: seriesY[i] })

        this.setState({
            chartData
        })
    }

    drawPredictionChart = (seriesXForPrediction = this.state.seriesXForPrediction, seriesYForPrediction = this.state.seriesYForPrediction) => {

        const { seriesX } = this.state

        const series = seriesXForPrediction.length > 0
                        ? seriesXForPrediction
                        : [seriesX[0],seriesX[seriesX.length - 1]]

        let predictionData = []
        for(let i = 0; i < series.length; i++)
            predictionData.push({ x: series[i], y: seriesYForPrediction[i] })

        this.setState({ predictionData })
    }

    handleChangeSeriesX = seriesX => {
        this.setState({
            seriesX
        })
        this.drawChart(seriesX)
    }

    handleChangeSeriesY = seriesY => {
        this.setState({
            seriesY
        })
        this.drawChart(undefined,seriesY)
    }

    handleChangeSeriesXForPrediction = seriesXForPrediction =>
        this.setState({ seriesXForPrediction })

    handleChangeInteractions = interactions =>
        this.setState({ interactions })

    handleTrain = () => {
        const {
            training,
            seriesX,
            seriesY,
            interactions
        } = this.state

        if(training)
            return false

        this.setState({ training: true })

        const trainings = []

        for(let i = 0; i < interactions; i++){
            trainings.push(
                () => new Promise(resolve => {
                    train(seriesX,seriesY)
                        .then(() => {
                            this.handlePredict()
                            delay(100)
                                .then(resolve)
                        })
                })
            )
        }

        trainings.reduce((prev, cur) => prev.then(cur), new Promise(resolve => resolve()))
            .then(() => this.setState({ training: false }))
    }

    handlePredict = () => {
        const { seriesX, seriesXForPrediction } = this.state

        const series = seriesXForPrediction.length > 0
                        ? seriesXForPrediction
                        : [seriesX[0],seriesX[seriesX.length - 1]]

        predict(series)
            .then(seriesYForPrediction => {
                this.setState({
                    seriesYForPrediction
                })
                this.drawPredictionChart(undefined,seriesYForPrediction)
            })
    }

    render () {

        const { chartData, predictionData, training, interactions } = this.state

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
                        <NumericInput
                            name="Interactions"
                            value={ interactions }
                            onChangeValue={ this.handleChangeInteractions }
                            />
                        <div className={ "series-action" + ( training ? ' loading ' : '' ) }>
                            <Button
                                onClick={ this.handleTrain }
                                disabled={ training } >
                                Train Model
                            </Button>
                            <img alt="loading" src="img/loading.svg" />
                        </div>
                    </section>
                    <section className="function">
                        <div className="function-header">
                            <SeriesInput
                                name="X for prediction"
                                placeholder={ [] }
                                onChangeSeries={ this.handleChangeSeriesXForPrediction }
                                />
                            <Button
                                onClick={ this.handlePredict } >
                                Predict
                            </Button>
                        </div>
                        <Chart
                            data={ chartData }
                            predictionData={ predictionData } />
                    </section>
                </div>
            </div>
        )
    }
}

export default Main