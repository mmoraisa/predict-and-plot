import React from 'react'
import {
    GradientDefs,
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineMarkSeries,
    MarkSeries
} from 'react-vis'
import '../../node_modules/react-vis/dist/style.css'

const gradient = (
    <GradientDefs>
        <linearGradient
            id="gradient-chart"
            gradientUnits="userSpaceOnUse"
            x1="0" y1="0" x2="200" y2="200" >
            <stop offset="0%" stopColor="#03001e" />
            <stop offset="50%" stopColor="#7303c0" />
            <stop offset="100%" stopColor="#7303c0" />
        </linearGradient>
    </GradientDefs>
)

const predictionGradient = (
    <GradientDefs>
        <linearGradient
            id="prediction-gradient-chart"
            gradientUnits="userSpaceOnUse"
            x1="0" y1="0" x2="200" y2="200" >
            <stop offset="0%" stopColor="#bc4e9c" />
            <stop offset="100%" stopColor="#f80759" />
        </linearGradient>
    </GradientDefs>
)

const Chart = ({ data, predictionData = [] }) => {
    return (
        <XYPlot
        colorRange={['#c7e9c0', '#00441b']}
            width={300}
            height={300} >
            {gradient}
            {predictionGradient}
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <MarkSeries
                color={'url(#gradient-chart)'}
                animation
                data={ data } />
            {
                predictionData.length > 0 &&
                (
                    <LineMarkSeries
                        color={'url(#prediction-gradient-chart)'}
                        curve={ 'curveMonotoneX' }
                        animation
                        data={ predictionData } />
                )
            }
        </XYPlot>
    )
}

export default Chart