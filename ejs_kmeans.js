/* Program: K-Means Clustering Algorithm
Version : 1.0.1
Language : Javascript
Description : Penerapan K-Means Clustering pada Javascript
Author : Eko Junaidi Salam
Email : eko_junaidisalam@live.com */

/* MIT License

Copyright (c) 2017 Eko Junaidi Salam

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

function Data(a){
	this.mData = a;
	this.mCluster = 0;
}
Data.prototype.val = function(i,v){
	if(i !== undefined && v !== undefined){
		this.mData[i] = v;
	}else{
		return this.mData;
	}
};
Data.prototype.size = function(){
	return this.mData.length;
}
Data.prototype.cluster = function(cNumber){
	if(cNumber !== undefined){
		this.mCluster = cNumber;
	}else{
		return this.mCluster;
	}
};

function k_mean_cluster(samples){
	this.n_cluster = 0;
	this.samples = samples;
	this.t_data = samples.length;
	this.dataset = [];
	this.centroids = [];
	
	this.bigNumber = Math.pow(10,10);
	this.minimum = this.bigNumber;
	this.distance = 0.0;
	this.sampleNumber = 0;
	this.cluster = 0;
	this.isStillMoving = true;
	this.newData = null;
	this.hasil = '';
}

k_mean_cluster.prototype.initialize = function(iCentroid){
	this.n_cluster = iCentroid.length;
	this.hasil += 'Centroids initialized at:<br />';
	for(var i=0;i<this.n_cluster;i++){
		this.centroids.push(iCentroid[i]);
		this.hasil += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(" + this.centroids[i] + ")<br />";
	}
	this.hasil += "<br />";
}

k_mean_cluster.prototype.calculate = function(){
	var euclidean_distance = function(c,d){
		var dist = 0;
		if(c.length == d.length){
			for(var i=0;i<c.length;i++){
				dist += Math.pow(c[i]-d[i],2);
			}
			return Math.sqrt(dist);
		}else{
			return 'Dimensi tidak sama';
		}
	};
	
	var calc_centroids = function(n_cluster,dataset){
		var new_centroid = [];
		for(var i=0;i<n_cluster;i++){
			var total = [];
			for(var k=0;k<dataset[0].size();k++){
				var tmp = [];
				for(var j=0;j<dataset.length;j++){
					if(dataset[j].cluster() == i){
						tmp.push(dataset[j].val()[k]);
					}
				}
				if(tmp.length > 0){
					var totalInCluster = tmp.length;
					var calc = tmp.reduce(function(a,b){return a+b;}) / totalInCluster;
					total.push(calc);
				}
			}
			new_centroid.push(total);
		}
		return new_centroid;
	};
	
	while(this.dataset.length < this.t_data){
		this.newData = new Data(this.samples[this.sampleNumber]);
		this.dataset.push(this.newData);
		
		this.sampleNumber++;
	}
	
	// calculate Centroid Distance
	var euclidean_dist = [];
	for(var i=0;i<this.dataset.length;i++){
		var buff = [];
		for(var j=0;j<this.centroids.length;j++){
			buff.push(euclidean_distance(this.centroids[j],this.dataset[i].val()));
		}
		euclidean_dist.push(buff);
	}
	
	// Object clustering
	for(i=0;i<euclidean_dist.length;i++){
		this.minimum = this.bigNumber;
		for(j=0;j<this.n_cluster;j++){
			for(k=0;k<euclidean_dist[i].length;k++){
				this.distance = euclidean_dist[i][k];
				if(this.distance < this.minimum){
					this.minimum = this.distance;
					this.cluster = k;
				}
			}
		}
		this.dataset[i].cluster(this.cluster);
	}
	
	// Calculate centroids
	var nCentroid = calc_centroids(this.n_cluster,this.dataset);
	for(i=0;i<this.n_cluster;i++){
		if(nCentroid[i].length > 0){
			this.centroids[i] = nCentroid[i];
		}
	}
	
	// Shifting centroids.
	while(this.isStillMoving){
		// calculate new centroids
		var c = calc_centroids(this.n_cluster,this.dataset);
		for(i=0;i<this.n_cluster;i++){
			if(c[i].length > 0){
				this.centroids[i] = c[i];
			}
		}
		
		// Assign all data to the ncentroids
		this.isStillMoving = false;
		
		euclidean_dist = [];
		for(i=0;i<this.dataset.length;i++){
			buff = [];
			for(j=0;j<this.centroids.length;j++){
				buff.push(euclidean_distance(this.centroids[j],this.dataset[i].val()));
			}
			euclidean_dist.push(buff);
		}
		
		for(i=0;i<euclidean_dist.length;i++){
			this.minimum = this.bigNumber;
			for(j=0;j<this.n_cluster;j++){
				for(k=0;k<euclidean_dist[i].length;k++){
					this.distance = euclidean_dist[i][k];
					if(this.distance < this.minimum){
						this.minimum = this.distance;
						this.cluster = k;
					}
				}
			}
			if(this.dataset[i].cluster() != this.cluster){
				this.dataset[i].cluster(this.cluster);
				this.isStillMoving = true;
			}else{
				this.dataset[i].cluster(this.cluster);
			}
		}
	}
}

k_mean_cluster.prototype.result = function(){
	for(i=0;i<this.n_cluster;i++){
		this.hasil += 'Cluster '+i+' includes:<br />';
		for(j=0;j<this.t_data;j++){
			if(this.dataset[j].cluster() == i){
				this.hasil += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(" + this.dataset[j].val() + ")<br />";
			}
		}
		this.hasil += "<br />";
	}
	
	this.hasil += 'Centroids finalized at: <br />';
	for(i=0;i<this.n_cluster;i++){
		this.hasil += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>(" + this.centroids[i] + ")</strong><br />";
	}
	this.hasil += "<br />";
	return this.hasil;
}

function TestData(samples,centroid){
	console.log('Samples Data : %s \n','('+samples.join(') (')+')');
	var k_means = new k_mean_cluster(samples);
	k_means.initialize(centroid);
	k_means.calculate();
	// console.log(k_means.result().replace(/<br \/>/g,"\n").replace(/&nbsp;/g,' ').replace(/<\/?strong>/g,''));
}

// TestData([[5.09,5.80], [3.24,5.90], [1.68,4.90], [1.00,3.17], [1.48,1.38], [2.91,0.20], [4.76,0.10], [6.32,1.10], [7.00,2.83], [6.52,4.62]],[[1.48,1.38],[4.76,0.10]]);
// TestData([[5.09,5.80], [3.24,5.90], [1.68,4.90], [1.00,3.17], [1.48,1.38], [2.91,0.20], [4.76,0.10], [6.32,1.10], [7.00,2.83], [6.52,4.62]],[[5.09,5.80], [3.24,5.90]]);
// TestData([[1.0,1.0],[1.5,2.0],[3.0,4.0],[5.0,7.0],[3.5,5.0],[4.5,5.0],[3.5,4.5]],[[1,1],[5,7]]);
// TestData([[1,1],[2,1],[4,3],[5,4]],[[1,1],[2,1]]);
// TestData([[1,1,2],[2,1,3],[4,3,2],[5,4,4],[4,4,4]],[[1,1,2],[2,1,3]]);
// TestData([[5.09,5.80], [3.24,5.90], [1.68,4.90], [1.00,3.17], [1.48,1.38], [2.91,0.20], [4.76,0.10], [6.32,1.10], [7.00,2.83], [6.52,4.62]],[[5.09,5.80], [3.24,5.90], [1.68,4.90]]);