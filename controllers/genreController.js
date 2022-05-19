const logger = require('../config/winston');
var Genre = require('../models/genre');
//const {body, validationResult }= require('express-validator');

/**
 * To get list of genre
  */
exports.genre_list= function(req,res,next){
    //res.render('genre_list',{title:'Genre List', list:'data'});
    logger.info('Hello from genre_list');
    Genre.find({}, function(err, data){
        if(err) {
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
    // res.json({title:'Thanks to MDN'});
}
/**
 * To add new genre
  */
exports.genre_create= function(req,res,next){
    const genre = new Genre({
        name:req.body.name
    });
   
    genre.save(function (err,data){
        if (err){
            return res.json(err);
        }
        return res.status(201).json(data);
    });
}
/**
 * To get details of a particular genre
 */
exports.genre_detail = function(req, res, next){
    
    console.log('genre_detail invoked for particualr id');
    console.log(req.params);
    logger.debug(req.params);
    var query = Genre.findById(req.params.id);
    
    query.select('_id name');
    query.exec(function (err, data){
        if(err){
            return res.json(err);
        }
        return res.status(200).json(data);
    });
}
/**
 * To delete particular genre by id
 */
exports.genre_delete = function(req,res,next){
    Genre.findByIdAndRemove(req.params.id , function(err, data){
        if(err){
            return res.json(err);
        }
        return res.status(200).json(data);

    });
    
}
/**
 * To update genre by id
 */
exports.genre_put=function(req,res,next){
    console.log('genre_put');
    var g = new Genre({
        name:req.body.name,
        _id:req.params.id 
    });
    
    Genre.findByIdAndUpdate(req.params.id ,g, {runValidators: true},  function(err, data){
        
        if(err){
            return res.json(err);
        }
       
        return res.status(200).json(g); //when we return data it returns existing object - not updated one

    });
}