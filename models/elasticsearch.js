var elasticsearch = require('elasticsearch');
var elasticClient = new elasticsearch.Client({
  	host: 'localhost:9200',
  	log: 'trace'
});
module.exports = {
	ping: function(req, res){
		elasticClient.ping({
		  	requestTimeout: 30000,
		}, function (error) {
			if (error) {
				res.status(500)
			    return res.json({status: false, msg: 'Elasticsearch cluster is down!'})
			} else {
			    res.status(200);
			    return res.json({status: true, msg: 'Success! Elasticsearch cluster is up!'})
			}
		});
	},

	// Create index
	initIndex: function(req, res, indexName){

	    elasticClient.indices.create({
	        index: indexName
	    }).then(function (resp) {
	        console.log(resp);
	        res.status(200)
	        return res.json(resp)
	    }, function (err) {
	        console.log(err.message);
	        res.status(500)
	        return res.json(err)
	    });
    },
    addDocument: function(req, res, indexName, _id, docType, payload){
	    elasticClient.index({
	        index: indexName,
	        type: docType,
	        id: _id,
	        body: payload
	    }).then(function (resp) {
	        console.log(resp);
	        res.status(200);
	        return res.json(resp)
	    }, function (err) {
	        console.log(err.message);
	        res.status(500)
	        return res.json(err)
	    });
    },
    initMapping: function(req, res, indexName, docType, payload){

	    elasticClient.indices.putMapping({
	        index: indexName,
	        type: docType,
	        body: payload
	    }).then(function (resp) {
	        res.status(200);
	        return res.json(resp)
	    }, function (err) {
	        res.status(500)
	        return res.json(err)
	    });
	},
	// Search Using regular expressions
	search: function(req, res, indexName, docType, payload){
		elasticClient.search({
	        index: indexName,
	        type: docType,
	        body: {
				query:{
					regexp:{
						'name':payload+'.*'
					},

				}
			}
	    }).then(function (resp) {
	        console.log(resp);
	        return res.json(resp)
	    }, function (err) {
	        console.log(err.message);
	        return res.json(err.message)
	    });
	},
	
	

	 // Delete a document from an index
	 deleteDocument: function(req, res, index, _id, docType){
		elasticClient.delete({
		    index: index,
			type: docType,
			id: _id,
		}, function(err, resp) {
		    if (err) return res.json(err);
		    return res.json(resp);
		});
	},

	// Delete All Index
	deleteAll: function(req, res){
		elasticClient.indices.delete({
		    index: '_all'
		}, function(err, resp) {

		    if (err) {
		        console.error(err.message);
		    } else {
		        console.log('Indexes have been deleted!', resp);
		        return res.json(resp)
		    }
		});
	},

}