const logger = require('../config/winston');
const fs = require('fs');
const path = require('path');

const SOURCEPATH = process.env.SOURCEFOLDERPATH;
let resourcePath= process.env.URLNAME;
exports.content_detail = function(req,res,next){
    console.log('content details called....');
    const yearname = req.params.yearname;
    let optionid = req.params.optionid;
    const filename=req.params.filename;
    let  dirName = path.join(SOURCEPATH, yearname) ;
    let fullFileName = "";
    //2 means listing - vasti patrak
    if(optionid==2){
        dirName = path.join(SOURCEPATH, yearname,"Listing") ;
    }
    fullFileName = path.join(dirName, filename);
    console.log(fullFileName);
    if(!fs.existsSync(fullFileName)){
        return res.status(404).json({status:404, message:'No data found'});
    }
    res.sendFile(fullFileName);
}