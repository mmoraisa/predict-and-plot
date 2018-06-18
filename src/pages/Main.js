import React, { Component } from 'react'
import './Main.css'

import SeriesInput from '../components/SeriesInput'

const placeholderSerieX = [1,2,3,4,5];
const placeholderSerieY = [5,32,6,1,2];

class Main extends Component{
    render () {
        return (
            <div>
                <h1>Predict&Plot</h1>
                <div className="content">
                    <section className="series">
                        <SeriesInput
                            name="Serie X"
                            placeholder={ placeholderSerieX }
                            />
                        <SeriesInput
                            name="Serie Y"
                            placeholder={ placeholderSerieY }
                            />
                    </section>
                    <section className="function"></section>
                </div>
            </div>
        )
    }
}

export default Main