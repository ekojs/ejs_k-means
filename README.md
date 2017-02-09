## K-Means Clustering Algorithm

### Penerapan K-Means Clustering pada Javascript


### Cara melakukan Test Training pada [`ejs_kmeans.js`](https://github.com/ekojs/matikan/blob/master/ejs_kmeans.js)

#### 1 - UnComment pada baris 221
```javascript
console.log(k_means.result().replace(/<br \/>/g,"\n").replace(/&nbsp;/g,' ').replace(/<\/?strong>/g,''));
```

#### 2 - UnComment pada salah satu sample data
```javascript
TestData([[5.09,5.80], [3.24,5.90], [1.68,4.90], [1.00,3.17], [1.48,1.38], [2.91,0.20], [4.76,0.10], [6.32,1.10], [7.00,2.83], [6.52,4.62]],[[1.48,1.38],[4.76,0.10]]);
// TestData([[5.09,5.80], [3.24,5.90], [1.68,4.90], [1.00,3.17], [1.48,1.38], [2.91,0.20], [4.76,0.10], [6.32,1.10], [7.00,2.83], [6.52,4.62]],[[5.09,5.80], [3.24,5.90]]);
// TestData([[1.0,1.0],[1.5,2.0],[3.0,4.0],[5.0,7.0],[3.5,5.0],[4.5,5.0],[3.5,4.5]],[[1,1],[5,7]]);
// TestData([[1,1],[2,1],[4,3],[5,4]],[[1,1],[2,1]]);
// TestData([[1,1,2],[2,1,3],[4,3,2],[5,4,4],[4,4,4]],[[1,1,2],[2,1,3]]);
// TestData([[5.09,5.80], [3.24,5.90], [1.68,4.90], [1.00,3.17], [1.48,1.38], [2.91,0.20], [4.76,0.10], [6.32,1.10], [7.00,2.83], [6.52,4.62]],[[5.09,5.80], [3.24,5.90], [1.68,4.90]]);
```

#### 3 - Eksekusi langsung
```javascript
node ejs_kmeans.js
```

#### 4 - Hasilnya kurang lebih akan seperti ini
```javascript
Samples Data : (5.09,5.8) (3.24,5.9) (1.68,4.9) (1,3.17) (1.48,1.38) (2.91,0.2) (4.76,0.1) (6.32,1.1) (7,2.83) (6.52,4.62)

Centroids initialized at:
     (1.48,1.38)
     (4.76,0.1)


Cluster 0 includes:
     (5.09,5.8)
     (3.24,5.9)
     (1.68,4.9)
     (1,3.17)
     (1.48,1.38)


Cluster 1 includes:
     (2.91,0.2)
     (4.76,0.1)
     (6.32,1.1)
     (7,2.83)
     (6.52,4.62)


Centroids finalized at:
     (2.498,4.23)
     (5.502000000000001,1.7700000000000002)
```


#### Note:
Baca artikel pada [`K-Means Clustering Algorithm`](http://ekojunaidisalam.com/2017/02/09/k-means-clustering-algorithm/)
