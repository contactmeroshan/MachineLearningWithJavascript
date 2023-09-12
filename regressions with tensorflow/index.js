require("@tensorflow/tfjs-node");
const tf = require("@tensorflow/tfjs");
const loadCSV = require("./load-csv");
const LinearRegression = require("./linear-regression");
const plot = require("nodeplotlib");

const { features, labels, testFeatures, testLabels } = loadCSV("./cars.csv", {
  shuffle: true,
  splitTest: 50,
  dataColumns: ["horsepower", "weight", "displacement"],
  labelColumns: ["mpg"],
});

const regression = new LinearRegression(features, labels, {
  learningRate: 0.5, // Adjust the learning rate if needed
  iterations: 100,
});

// try {
//   regression.train();
//   const [B, M] = regression.weights.dataSync();
//   console.log("Weight B:", B);
//   console.log("Weight M:", M);
// } catch (error) {
//   console.error("Error during training:", error);
// }

regression.features.print();

regression.train();
const r2 = regression.test(testFeatures, testLabels);
console.log("regression history ", regression.MSEhistory);
console.log("Rsquare r2 is ", r2);
// plot({
//   x: regression.MSEhistory.reverse(),
// });
