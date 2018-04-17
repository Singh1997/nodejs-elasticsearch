const ElasticSearch=require('../models/elasticsearch');
var express = require('express');
var router = express.Router();

//Route to check connection
router.get('/elastic/ping',(req,res,next)=>{
    ElasticSearch.ping(req,res);
});

//Route to create index
router.post('/elastic/createIndex',(req,res,next)=>{
    var payload=req.body.payload;
    var id=req.body.id;
    var indexName=req.body.indexName;
    var indexType=req.body.indexType;
    ElasticSearch.addDocument(req,res,indexName,id,indexType,payload);
});

//Route for searching 
router.post('/elastic/search',(req,res,next)=>{
    var body=req.body.body;
    var indexName=req.body.indexName;
    var indexType=req.body.indexType;
    ElasticSearch.search(req,res,indexName,indexType,body);
    return null;
})

//Route to delete a single document
router.put('/elastic/deleteDocument',(req,res,next)=>{
    var id=req.body.id;
    var indexName=req.body.indexName;
    var indexType=req.body.indexType;
    ElasticSearch.deleteDocument(req,res,indexName,id,indexType);
});

//Route for deleting all index
router.put('/elastic/deleteAllIndex',(req,res,next)=>{
    ElasticSearch.deleteAll(req,res);
});
module.exports = router;