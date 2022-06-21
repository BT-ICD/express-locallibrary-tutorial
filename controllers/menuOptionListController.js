const logger = require('../config/winston');
const MenuOptionModel= require('../models/menuOption.model');

/**
 * To get list of menu item
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.menu_list = function(req,res,next){
    logger.info('menu list requested');
    let menuOptionList=[];
    menuOptionList.push(new MenuOptionModel(1,'Index'));
    menuOptionList.push(new MenuOptionModel(2,'Vastipatrak'));
    menuOptionList.push(new MenuOptionModel(3,'Advertisements'));
    menuOptionList.push(new MenuOptionModel(4,'Photos'));
    menuOptionList.push(new MenuOptionModel(5,'Coverpage'));
    menuOptionList.push(new MenuOptionModel(6,'Other'));
    return res.status(200).json(menuOptionList);
}