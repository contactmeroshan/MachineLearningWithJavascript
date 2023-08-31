const outputs = []

const predictionpoint = 300;
const k = 3;


function distancefrompredictionpoint(point)
{
  return Math.abs(point - predictionpoint)
}

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel])

}

function runAnalysis() {
  // Write code here to analyze stuff
 const bucket = _.chain(outputs)
		.map( eacharray => [distancefrompredictionpoint(eacharray[0]), eacharray[3]] )
		.sortBy(eacharray => eacharray[0])
		.slice(0, k)
		.countBy(eacharray => eacharray[1])
		.toPairs()
		.sortBy()
		.last()
		.first()
		.parseInt()
		.value()

    console.log("most probable bucket number is :", bucket);
}

