const logger = require('../config/winston');
const ContentModel = require('../models/contentList.model');
const fs = require('fs');
const path = require('path');

/**
 * To return list of content/files based on arguments such as year, menu option type
 */
exports.content_list = function(req,res,next){
    logger.info('content list requested');
    let contentList =[];
    const yearname = req.params.yearname;
    let optionid = req.params.optionid;
    console.log('content list requested for ');
    //To check directory exist 
    if(!fs.existsSync("D:\\Modha_Content\\"+ yearname)){
        return res.status(200).json('invalid director name');
    }
    let names = fs.readdirSync("D:\\Modha_Content\\"+yearname);
    console.log(names);
    for(let i = 0;i<names.length;i++){
        let fileName = "D:\\Modha_Content\\"+yearname+"\\"+names[i];
        console.log(fileName);
        if (fs.lstatSync(fileName).isFile()){
            contentList.push(new ContentModel(names[i]));
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
    const startpage = req.params.start;
    const endpage= req.params.endpage;
    console.log('content list requested for ');
    //To check directory exist 
    if(!fs.existsSync("D:\\Modha_Content\\"+ yearname+"\\Listing")){
        return res.status(200).json('invalid director name');
    }
    let names = fs.readdirSync("D:\\Modha_Content\\"+yearname+"\\Listing");
    for(let i = 0;i<names.length;i++){
        let fileName = "D:\\Modha_Content\\"+yearname+"\\Listing\\"+names[i];
        if (fs.lstatSync(fileName).isFile()){
            contentList.push(new ContentModel(names[i]));
        }
    }
    return res.status(200).json(contentList);
}
exports.content_detail = function(req,res,next){
    console.log('content details called');
    //res.download("D:\\Modha_Content\\1964\\Listing\\1964_Listing_0002.pdf");
    // OR
    // res.writeHead(200, {
    //     "Content-Type": "application/octet-stream",
    //     "Content-Disposition" : "attachment; filename=1964_Listing_0002.pdf"  });
    //   fs.createReadStream("D:\\Modha_Content\\1964\\Listing\\1964_Listing_0002.pdf").pipe(res);

    res.sendFile("D:\\Modha_Content\\1964\\Listing\\1964_Listing_0002.pdf");
}