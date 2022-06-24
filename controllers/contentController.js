const logger = require('../config/winston');
const ContentModel = require('../models/contentList.model');
const fs = require('fs');
const path = require('path');
const { dirname } = require('path');

const SOURCEPATH = process.env.SOURCEFOLDERPATH;
let resourcePath= process.env.URLNAME;
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
            if(optionid=="1"){
                if( names[i].indexOf("Index")>0){
                    let obj = new ContentModel(yearname ,names[i], resourcePath + + yearname +  "/"+  optionid +"/" + names[i]);
                    contentList.push(obj);
                }
            }
            else if (optionid==3){
                if( names[i].indexOf("Advertise")>0){
                    let obj = new ContentModel(yearname ,names[i], resourcePath + + yearname +  "/"+  optionid +"/" + names[i]);
                    contentList.push(obj);
                }
            }
            else if (optionid==4){
                if( names[i].indexOf("Photos")>0){
                    let obj = new ContentModel(yearname ,names[i], resourcePath + + yearname +  "/"+  optionid +"/" + names[i]);
                    contentList.push(obj);
                }
            }
            else if (optionid==5){
                if( names[i].indexOf("Cover_Page")>0){
                    let obj = new ContentModel(yearname ,names[i], resourcePath + + yearname +  "/"+  optionid +"/" + names[i]);
                    contentList.push(obj);
                }
            }
            else if (optionid==6){
                if( names[i].indexOf("Other")>0){
                    let obj = new ContentModel(yearname ,names[i], resourcePath + + yearname +  "/"+  optionid +"/" + names[i]);
                    contentList.push(obj);
                }
            }
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
    if(optionid!="2"){
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
                let obj = new ContentModel(yearname ,names[i], resourcePath + yearname +  "/"+   names[i]);
                contentList.push(obj);
            }
        }
    }
    return res.status(200).json(contentList);
}
exports.content_detail = function(req,res,next){
    console.log('content details called....');
    const yearname = req.params.yearname;
    let optionid = req.params.optionid;
    const filename=req.params.filename;
    //To check directory exist 
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