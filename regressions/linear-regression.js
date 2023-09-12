const tf = require("@tensorflow/tfjs");
const _ = require("lodash");

class LinearRegression {
  constructor(features, labels, options) {
    this.features = features;
    this.labels = labels;
    this.options = Object.assign(
      { learningRate: 0.1, iterations: 1000 },
      options,
    );
    this.m = 0;
    this.b = 0;
  }
  //   GRADIENT DESCENT IMPLEMENTATION WITHOUT TENSORFLOW
  gradientDescent() {
    // this is MX + B value to the derivative of MSE(mean squared error) w.r.t both M and B, for the equation y=mx+b
    const currentGuessesForMPG = this.features.map((row) => {
      return this.m * row[0] + this.b;
    });

    // below is the derivative THAT IS slope of MEAN SQUARED VALUE w.r.t "b" in the equation y = mx + b
    // where y is MILES PER GALLON(MPG) (LABELS - not given, to be guessed) extracted from CSV file,
    // and x is the HORSEPOWER(FEATURE - given  )
    // ULTIMATELY to find the relationship in form of equation Y = MX + B between MPG and HORSEPOWER,
    // so that we can GUESS M AND V values to be used complete the REALTIONSHIP EQUATION
    // and then this complete equation of Y = MX + B , to PREDICT the MPG based on some HORSEPOWER
    // VALUE .
    const bSlope =
      (_.sum(
        currentGuessesForMPG.map((guess, i) => {
          return guess - this.labels[i][0];
        }),
      ) *
        2) /
      this.features.length;

    // SIMILARLY this is the derivative
    // THAT IS slope of MEAN SQUARED VALUE w.r.t "b" in the equation y = mx + b
    const mSlope =
      (_.sum(
        currentGuessesForMPG.map((guess, i) => {
          return -1 * this.features[i][0] * (this.labels[i][0] - guess);
        }),
      ) *
        2) /
      this.features.length;

    this.m = this.m - mSlope * this.options.learningRate;
    this.b = this.b - bSlope * this.options.learningRate;
  }

  train() {
    for (let i = 0; i < this.options.iterations; i++) {
      this.gradientDescent();
    }
  }
}

module.exports = LinearRegression;
