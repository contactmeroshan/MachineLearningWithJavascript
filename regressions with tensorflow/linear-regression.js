const tf = require("@tensorflow/tfjs");
const _ = require("lodash");

class LinearRegression {
  constructor(features, labels, options) {
    // Convert input data to TensorFlow tensors for efficient computation
    this.features = this.processFeatures(features); // Features as a tensor
    this.labels = tf.tensor(labels, [labels.length, 1]); // Labels as a tensor, ensure it's a column vector
    this.MSEhistory = [];
    this.iterationtimes = [];
    this.options = Object.assign(
      { learningRate: 0.1, iterations: 1000 },
      options,
    );
    this.weights = tf.zeros([this.features.shape[1], 1]); // Initialize weights based on the number of features
  }

  // Gradient Descent Implementation using TensorFlow operations
  gradientDescent() {
    const currentGuesses = this.features.matMul(this.weights); // Compute predictions
    const differences = currentGuesses.sub(this.labels); // Calculate the difference between predictions and actual labels

    const slopes = this.features
      .transpose()
      .matMul(differences)
      .div(this.features.shape[0]); // Compute the average slope

    this.weights = this.weights.sub(slopes.mul(this.options.learningRate)); // Update weights using the learning rate
  }

  train() {
    // Perform gradient descent for the specified number of iterations
    for (let i = 0; i < this.options.iterations; i++) {
      this.gradientDescent();
      this.iterationtimes.noOFiteration = i;
      this.recordMSE();
      this.updateLearningRate();
    }
  }

  test(testFeatures, testLabels) {
    // Convert test data to TensorFlow tensors and standardize
    const testFeaturesTensor = this.processFeatures(testFeatures);
    const testLabelsTensor = tf.tensor(testLabels, [testLabels.length, 1]); // Ensure test labels are column vectors

    // Calculate predictions
    const predictions = testFeaturesTensor.matMul(this.weights);

    const residualSumOfSquares = tf
      .sum(tf.square(testLabelsTensor.sub(predictions)))
      .arraySync();
    const totalSumOfSquares = tf
      .sum(tf.square(testLabelsTensor.sub(tf.mean(testLabelsTensor))))
      .arraySync();

    const r2 = 1 - residualSumOfSquares / totalSumOfSquares;

    return r2;
  }

  processFeatures(features) {
    const featuresTensor = tf.tensor(features);

    // Create a column of ones for the bias term
    const onesColumn = tf.ones([featuresTensor.shape[0], 1]);

    // Standardize features
    const standardizedFeatures = this.standardize(featuresTensor);

    // Concatenate the onesColumn with the standardized features
    const processedFeatures = standardizedFeatures.concat(onesColumn, 1);

    return processedFeatures;
  }

  standardize(featuresTensor) {
    const { mean, variance } = tf.moments(featuresTensor, 0);
    const standardizedFeatures = featuresTensor
      .sub(mean)
      .div(variance.pow(0.5));
    return standardizedFeatures;
  }

  recordMSE() {
    const mse = this.features
      .matMul(this.weights)
      .sub(this.labels)
      .pow(2)
      .sum()
      .div(this.features.shape[0])
      .dataSync();
    this.MSEhistory.unshift(mse);
  }

  updateLearningRate() {
    if (this.MSEhistory.length < 2) {
      return;
    }

    // Calculate the change in MSE between the current and previous iteration
    const deltaMSE = this.MSEhistory[0] - this.MSEhistory[1];

    // Adjust the learning rate based on deltaMSE
    if (deltaMSE > 0) {
      // If MSE increased, reduce learning rate by a factor (e.g., 0.5)
      this.options.learningRate *= 0.5;
    } else {
      // If MSE decreased, increase learning rate by a factor (e.g., 1.05)
      this.options.learningRate *= 1.05;
    }
  }
}

module.exports = LinearRegression;
