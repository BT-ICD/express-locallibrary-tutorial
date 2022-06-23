const logger = require('../config/winston');
const path= require('path');
const fs = require('fs');

const YearModel = require('../models/year.model');
const SOURCEPATH = process.env.SOURCEFOLDERPATH;


// const logger = require('../config/winston');
// var Employee = require('../models/Employee');
exports.year_list = function(req,res,next){
    logger.info('Year list requested');
    let yearlist=[];
    
    let names = fs.readdirSync(SOURCEPATH, {withFileTypes:true});
    names.forEach((fileEntry)=>{
        let fname = path.join(SOURCEPATH,fileEntry.name );
        if(!fs.lstatSync(fname).isFile()){
            console.log('FIle:',fileEntry.name);
           let data = new YearModel(fileEntry.name);
            // yearlist.push(new YearModel(fileEntry.name));
            yearlist.push(data);
        }
    });
    // console.log(names);
    return res.status(200).json(yearlist);
}