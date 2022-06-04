const logger = require('../config/winston');
var Employee = require('../models/Employee');
/**
 * To get list of employee
 */
exports.employee_list = function(req,res,next){
    logger.info('Employee list requested');
    Employee.find({},function(err, data){
        if(err){
            logger.error(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
}
/**
 * To add new employee
 */
exports.employee_create = function(req,res,next){
    logger.info('New employee create requested');
    const emp = new Employee({
        fullName:req.body.fullName,
        email:req.body.email,
        mobileNumber:req.body.mobileNumber,
        dateOfJoining:  req.body.dateOfJoining
    });
    console.log(emp);
    emp.save(function (err,data){
        if(err){
            //logger.info(err);
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
}
/**
 * To get details of a particular employee
 */
 exports.employee_detail= function(req,res,next){
     logger.info('employee details called for employee');
    logger.info('req.params.id');
     logger.info(req.params.id);
     var query = Employee.findById(req.params.id);
     query.select('_id fullName email mobileNumber dateOfJoining ');
     query.exec(function(err, data){
         if (err){
             logger.error(err);
             return res.status(500).json(err);
         }
         return res.status(200).json(data);
     });
 }

/**
 * To delete a particular employee record by id
 */
exports.employee_delete = function(req,res,next){
    Employee.findByIdAndDelete(req.params.id, function(err, data){
        if(err){
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};
/**
 * To edit details of existing employee
*/
exports.employee_put = function(req,res,next){
    console.log('employee put');
    
    var emp = new Employee({
        fullName:req.body.fullName,
        email:req.body.email,
        mobileNumber:req.body.mobileNumber,
        dateOfJoining:  req.body.dateOfJoining,
        _id:req.params.id
    });
    logger.info('Employee deteils to edit');
    logger.info(emp);

    Employee.findByIdAndUpdate(req.params.id, emp,{runValidators:true} , function(err, data){
        if(err){
            return res.status(500).json(err);
        }
        logger.debug('employee details edited successfully');
        return res.status(200).json(emp);
    }) ;
};

    


