const tf = require('@tensorflow/tfjs');

const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' }); // optimizer could be "Adam"

/*
const xs = tf.tensor2d(X, [X.length, 1]);
const ys = tf.tensor2d(y, [y.length, 1]);

model.fit(xs, ys, { epochs: 200 }).then(() => {
    // Model training completed
    // You can use the trained model for predictions
});*/