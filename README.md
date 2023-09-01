# Machine Learning With Javascript
mainly focussed on LINEAR REGRESSION and CLASSIFICATION algorithm chosen.

## 1) FEATURE(variable) objective analysis with K value using KNN(K nearest neighbour algorithm for our HTML page javascript game- like PLINK game show )
https://jstu.fandom.com/wiki/Plinko_board

Keeping all other FEATURES as is, K =10, 11, 12 gave about 20 to 30 percent prediction .

Then narrowing the testing with value of K=10, 11 AND 12.
With k=10 gave the best result in the console , by varying other variations(FEATURES)

--FEATURE value 0 meaning BALL POSITION 

--FEATURE value 1 meaning BALL BOUNCINESS 

--FEATURE value 2 meaning BALL SIZE

BUCKET NUMBER not being FEATURE but rather the LABEL , TO BE PREDICTED as per variations in the FEATURES mentioned above.

## Following console message appears on analysis
### For feature value of  0 your accuracy is :  0.32

score.js:28 for feature value of  1 your accuracy is :  0.2

score.js:28 for feature value of  2 your accuracy is :  0.28
<img width="950" alt="image" src="https://github.com/contactmeroshan/MachineLearningWithJavascript/assets/87830296/666e1c96-e565-4b70-8255-3778419588d0">

#### OBJECTIVES ACHIEVED THROUGH THIS EXCERCISE 
1) Difference between FEATURES and LABELS
2) When to choose FEATURES and when to discard it.
3) Difference between TRAINING SET DATA and TEST SET data, and use of each for each other.
4) NORMALIZATION of data (scaling the scale on a scale of 0 and 1, using MAXIMUM and MINIMUM from the TRAINING SET DATA observation )
5) COMMON DATA STRUCTURES to be used - arrays of arrays , to be later discovered when learning TENSORFLOW_JS having the functioning like LODASH library but more perfomant like industry standard PYTHON library NUMPY for numbers. 
