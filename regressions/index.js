require("@tensorflow/tfjs-node");
const tf = require("@tensorflow/tfjs");
const loadCSV = require("./load-csv");
const LinearRegression = require("./linear-regression");

const { features, labels, testFeatures, testLabels } = loadCSV("./cars.csv", {
  shuffle: true,
  splitTest: 50,
  dataColumns: ["horsepower"],
  labelColumns: ["mpg"],
});

const regression = new LinearRegression(features, labels, {
  learningRate: 0.001,
  iterations: 100,
});

regression.train();
console.log(
  "UPDATED M value is: ",
  regression.m,
  "UPDATED B value is: ",
  regression.b,
);
