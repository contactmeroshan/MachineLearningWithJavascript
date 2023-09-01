# Machine Learning With Javascript
mainly focussed on LINEAR REGRESSION and CLASSIFICATION algorithm chosen.

## 1) FEATURE(variable) objective analysis with K value using KNN(K nearest neighbour algorithm for our HTML page javascript game- like PLINK game show )
https://jstu.fandom.com/wiki/Plinko_board 

### This problem has a definite set of outputs , so its a CLASSFICATION PROBLEM , not the REGRESSION problem where range of values might be the prediction points. 
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
4) NORMALIZATION of data (scaling the scale on a scale of 0 and 1, using MAXIMUM and MINIMUM from the TEST SET DATA to train the TRAINING SET DATA )
5) COMMON DATA STRUCTURES to be used - arrays of arrays , to be later discovered when learning TENSORFLOW_JS having the functioning like LODASH library but more perfomant like industry standard PYTHON library NUMPY for numbers. 

## 2) The second problem related to CLASSIFICATION , where prediting HOUSE PRICES from CSV dataset, lends itself to range of outputs, thus a REGRESSION problem unlike the PLINKO game problem where outputs were definite and DISCRETE. 

As can be seen below we have used tensorflow.js library (index.js in the folder "knn-tf" ), more FEATURES we added our error percentage got reduced. But CPU ran slow , just for testing 10 data points. 

### Here we used STANDARDISATION instead of NORMALISATION unlike in PLINKO GAME above. Only because the dataset in the CSV had columns, some ranging from very low to very high, which if normalised on on O to 1 scale , would give falsse NEAREST NEIGHBOURs for our prediction. So instead STANDARDISATION = (PREDICTION POINT for each 10 datasets subracted by MEAN) / then , DIVIDED by STANDARD DEVIATION.

STANDARD DEVIATION BEING = SQUARE ROOT OF VARIANCE(using tensorflow.js moments ----> const { mean, variance } = tf.moments(features, 0);) 
O choosen for vertical that is column and 1 for row. 

<img width="768" alt="image" src="https://github.com/contactmeroshan/MachineLearningWithJavascript/assets/87830296/7328ebe3-a8ad-46d5-8285-9998ca5ba025">

### THE ERROR PERCENT CAME DOWN TO BELOW 20 %(9 out of 10 testing ) by just taking four of the FEATURES from the columns (dataColumns: ["lat", "long", "sqft_lot", "sqft_living"]) which is very encouraging. 
