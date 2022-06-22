const logger = require('../config/winston');
const ContentModel = require('../models/contentList.model');
const fs = require('fs');
const path = require('path');

const SOURCEPATH = process.env.SOURCEFOLDERPATH;
/**
 * To return list of content/files based on arguments such as year, menu option type
 */
exports.content_list = function(req,res,next){
    logger.info('content list requested');
    console.log(SOURCEPATH);
    
    let contentList =[];
    const yearname = req.params.yearname;
    let optionid = req.params.optionid;
    console.log('content list requested except vastiptrak');
    //To check directory exist 
    const dirName = path.join(SOURCEPATH, yearname)
    if(!fs.existsSync(dirName)){
        return res.status(200).json('invalid directory name');
    }
    let names = fs.readdirSync(dirName);
    for(let i = 0;i<names.length;i++){
        let fileName = path.join(dirName, names[i]);  //"D:\\Modha_Content\\"+yearname+"\\"+names[i];
        if (fs.lstatSync(fileName).isFile()){
            const lastFourDigits = names[i].substring(names[i].length-4);
            console.log(lastFourDigits);
            contentList.push(new ContentModel(yearname ,names[i]));
        }
    }
    /**Todo: Not able to access yearName variabe inside forEach  */
    // names.forEach((fileEntry)=>{
    //     console.log("D:\\Modha_Content\\"+yearname+"\\"+fileEntry.names);
    //     console.log("D:\\Modha_Content\\"+yearname+"\\"+fileEntry.names);
    //     // if(!fs.lstatSync("D:\\Modha_Content\\"+yearname+"\\"+fileEntry.names).isFile())
    //     // {
    //     //     contentList.push(new ContentModel(fileEntry.name));
    //     // }
    // });
    
    return res.status(200).json(contentList);
}
exports.content_list_pages=function(req,res,next){
    logger.info('content list for vasti patrak called');
    let contentList =[];
    const yearname = req.params.yearname;
    const optionid = req.params.optionid;
    const startpage =  parseInt(req.params.startpage);
    const endpage= parseInt(req.params.endpage);
    //To check directory exist 
    const dirName = path.join(SOURCEPATH, yearname,"Listing") ;
    if(optionid!="1"){
        return res.status(400).json({status:400, message:'invalid parameter'});
    }
    if(!fs.existsSync(dirName)){
        return res.status(200).json('invalid directory name');
    }
    let names = fs.readdirSync(dirName);
    
    for(let i = 0;i<names.length;i++){
        let fileName = path.join(dirName, names[i]); //"D:\\Modha_Content\\"+yearname+"\\Listing\\"+names[i];
        if (fs.lstatSync(fileName).isFile()){
            const lastFourDigits = parseInt( names[i].substring(13,17));
            if(lastFourDigits>=startpage && lastFourDigits<=endpage){
                contentList.push(new ContentModel(yearname, names[i]));
            }
        }
    }
    return res.status(200).json(contentList);
}
exports.content_detail = function(req,res,next){
    console.log('content details called');
    const yearname = req.params.yearname;
    const filename=req.params.filename;
    //To check directory exist 
    const dirName = path.join(SOURCEPATH, yearname,"Listing") ;
    if(!fs.existsSync(dirName)){
        return res.status(404).json({status:404, message:'No data found'});
    }
    //res.download("D:\\Modha_Content\\1964\\Listing\\1964_Listing_0002.pdf");
    // OR
    // res.writeHead(200, {
    //     "Content-Type": "application/octet-stream",
    //     "Content-Disposition" : "attachment; filename=1964_Listing_0002.pdf"  });
    //   fs.createReadStream("D:\\Modha_Content\\1964\\Listing\\1964_Listing_0002.pdf").pipe(res);
    const fullfilename = path.join(dirName,filename);
    console.log(fullfilename);
    //res.sendFile("D:\\Modha_Content\\1964\\Listing\\1964_Listing_0002.pdf");
    res.sendFile(fullfilename);
}