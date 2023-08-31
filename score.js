const outputs = [];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  // Write code here to analyze stuff
  const testsetsize = 50;
  const k = 10; // 10 was the k value out of 10, 11, 12 which gave better prediction.

  _.range(0, 3).forEach((featurenumberchoice) => {
    const data = _.map(outputs, (row) => [
      row[featurenumberchoice],
      _.last(row),
    ]);
    const [testSet, trainingSet] = SplitDataSet(minMax(data, 1), testsetsize);
    const accuracy = _.chain(testSet) // this will take ARRAYS from 'testset' shuffled arrays previously made.
      .filter(
        (testsetarray) =>
          knn(trainingSet, _.initial(testsetarray), k) === _.last(testsetarray),
      ) // comparing THE BUCKET coming out of KNN algorithm on "trainingset" to match the same bucket coming from the data of "testset"
      .size() // its like length of array from usng the LODASH LIBRARY , method chaining is easy!!
      .divide(testsetsize) // test whether same bucket prediction matches with the TESTSETSIZE , thus giving percentage of success below.
      .value();
    const accuracyPercentage = (accuracy / testsetsize) * 100;
    console.log(
      "for feature value of ",
      featurenumberchoice,
      "your accuracy is : ",
      accuracyPercentage,
    );
  });
}
//KNN algorithm implementation in a very crisp manner using LODASH library giving TOP K results giving max non-zero predictions

// point is assumed to be of three values because the last element of the array is the bucket
// that is , bucket number , is the LABEL/TO BE PREDICTED, so manually or automated way we will
// feed in only THREE POINT ARRAY , to predict the LAST FOURTH ELEMENT , that is , bucket number.
function knn(data, point, k) {
  return _.chain(data)
    .map((eacharray) => {
      return [
        distance(_.initial(eacharray), _.initial(point)),
        _.last(eacharray),
      ];
    })
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

// its goin to work with any number of arrays with multivariable , here ball size and
// ball jumpiness also considered . So three dimensional pythagorean distance between arrays having multiple set of
// values like [23, 234, 55, 234], [2343, 232344, 235, 29734] and so would work with ZIP funtion just tying the
// index 1, 2, 3, .... i, .... of one array to index of another array with index 1, 2, 3, .... i..
// pythagorean distance between probable k values producing most accurated bucket into which the ball falls
// would be , DIFFERENCE BETWEEN same index and SQUARING THEM UP , (a1-a2) square + (c1-c2)square.. etc all would
// would be added to give the closesed DISTANCE of probabilites between multiple VARIABLES / FEATURES ,
function distance(pointA, pointB) {
  return (
    _.chain(pointA)
      .zip(pointB)
      .map(([a, b]) => (a - b) ** 2)
      .sum()
      .value() ** 0.5
  );
}

function SplitDataSet(data, testcount) {
  const shuffled = _.shuffle(data);

  const testSet = _.slice(shuffled, 0, testcount); // split from O to TESTCOUNT of SHUFFLED Datasource
  const trainingSet = _.slice(shuffled, testcount); // split from TESTCOUNT to the end(is default when not mentioned)
  return [testSet, trainingSet];
}

function minMax(data, featurecount) {
  const clonedData = _.cloneDeep(data);

  for (let i = 0; i < featurecount; i++) {
    const column = clonedData.map((row) => row[i]);

    const min = _.min(column);
    const max = _.max(column);

    for (let j = 0; j < clonedData.length; j++) {
      clonedData[j][i] = (clonedData[j][i] - min) / (max - min);
    }
  }
  return clonedData;
}

// for k value of 10 we get most predicatbiltiy in the console message as
// "for feature value of  0 your accuracy is :  0.32 ---> ball position feature number 0, gives best result
// score.js:28 for feature value of  1 your accuracy is :  0.2
// score.js:28 for feature value of  2 your accuracy is :  0.28"
