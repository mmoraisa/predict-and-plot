import * as tf from '@tensorflow/tfjs'

// Define a model for linear regression
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

export const train = (seriesX,seriesY) => {
    return new Promise(resolve => {
        const xs = tf.tensor2d(seriesX, [seriesX.length, 1])
        const ys = tf.tensor2d(seriesY, [seriesY.length, 1])
        model.fit(xs, ys).then(resolve)
    })
}

export const predict = () => {
    model.predict(tf.tensor2d([5], [1, 1])).print();
}