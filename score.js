const outputs = [];
// const predictionpoint = 300;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  // Write code here to analyze stuff
  const testsetsize = 100;
  const [testSet, trainingSet] = SplitDataSet(outputs, testsetsize);
  _.range(1, 20).forEach((k) => {
    const accuracy = _.chain(testSet) // this will take ARRAYS from 'testset' shuffled arrays previously made.
      .filter(
        (testsetarray) =>
          knn(trainingSet, testsetarray[0], k) === testsetarray[3],
      ) // comparing THE BUCKET coming out of KNN algorithm on "trainingset" to match the same bucket coming from the data of "testset"
      .size() // its like length of array from usng the LODASH LIBRARY , method chaining is easy!!
      .divide(testsetsize) // test whether same bucket prediction matches with the TESTSETSIZE , thus giving percentage of success below.
      .value();
    const accuracyPercentage = accuracy / testsetsize;
    console.log(
      "for k value of ",
      k,
      "your accuracy is : ",
      accuracyPercentage,
    );
  });
}
//KNN algorithm implementation in a very crisp manner using LODASH library giving TOP K results giving max non-zero predictions
function knn(data, point, k) {
  return _.chain(data)
    .map((eacharray) => [distance(eacharray[0], point), eacharray[3]])
    .sortBy((eacharray) => eacharray[0])
    .slice(0, k)
    .countBy((slicedArray) => slicedArray[1])
    .toPairs()
    .sortBy()
    .last()
    .first()
    .parseInt()
    .value();
  //  CONSOLE OUTPUT
  // console.log("most probable bucket number is :", bucket);
}

function distance(pointA, pointB) {
  return Math.abs(pointA - pointB);
}

function SplitDataSet(data, testcount) {
  const shuffled = _.shuffle(data);

  const testSet = _.slice(shuffled, 0, testcount); // split from O to TESTCOUNT of SHUFFLED Datasource
  const trainingSet = _.slice(shuffled, testcount); // split from TESTCOUNT to the end(is default when not mentioned)
  return [testSet, trainingSet];
}
