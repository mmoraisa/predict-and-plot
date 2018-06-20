import React, { Component } from 'react'
import './Main.css'

import { predict, train } from '../helpers/Intelligence'
import { delay } from '../helpers/Utility'

import SeriesInput from '../components/SeriesInput'
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
        seriesXForPrediction: [1,6],
        seriesYForPrediction: [],
        training: false,
        trainingLoop: 0
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
        if(seriesXForPrediction.length !== seriesYForPrediction.length)
            return false

        let predictionData = []
        for(let i = 0; i < seriesXForPrediction.length; i++)
            predictionData.push({ x: seriesXForPrediction[i], y: seriesYForPrediction[i] })

        this.setState({
            predictionData
        })
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

    handleChangeSeriesXForPrediction = seriesXForPrediction => {
        this.setState({
            seriesXForPrediction
        })
    }

    handleTrain = () => {
        const { training, seriesX, seriesY, seriesXForPrediction } = this.state

        if(training)
            return false

        this.setState({
            training: true
        })

        const trainings = []

        for(let i = 0; i < 100; i++){
            trainings.push(
                () => new Promise(resolve => {
                    train(seriesX,seriesY)
                        .then(() => {
                            if(seriesXForPrediction.length > 0){
                                this.handlePredict()
                                delay(100)
                                    .then(resolve)
                            }
                        })
                })
            )
        }

        trainings.reduce((prev, cur) => prev.then(cur), new Promise(resolve => { resolve() }))
            .then(() => {
                this.setState({
                    training: false
                })
                console.log('training end')
            })
    }

    handlePredict = () => {
        const { seriesXForPrediction } = this.state
        predict(seriesXForPrediction)
            .then(seriesYForPrediction => {
                this.setState({
                    seriesYForPrediction
                })
                this.drawPredictionChart(undefined,seriesYForPrediction)
            })
    }

    render () {

        const { chartData, predictionData, training } = this.state

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