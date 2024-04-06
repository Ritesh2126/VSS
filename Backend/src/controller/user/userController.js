const userService = require('./userService');
const jwt = require('jsonwebtoken');

/**
 * Fetch Users with Similar Interests by User ID
 * @param {*} req - The request object
 * @param {*} res - The response object
 */
exports.showallusers = (req, res) => {
    console.log("in controler")
    // Assuming req.params.userId contains the user ID
    
    // Call the interestService to fetch users with similar interests
    return userService.showallusers()
        .then((result) => { 
            // Return a JSON response with the fetched data
            return res.status(200).json({ success: true, data: result });
        }).catch((error) => { 
            // Return a JSON response with an error message
            return res.status(500).json({ success: false, error: 'Internal server error' });
        });
}


exports.insertUser = (req, res, next) => {
    console.log("in contoll",req.body)
    console.log("chech data come by frintend",req)
    const postDetail = req.body; 
    
    userService.insertUser(postDetail)
        .then((result) => { 
            return res.status(200).json({ success: true, data: result });
        }).catch((error) => { 
            if (error) {
                return res.status(500).json({ success: false, error: 'Internal server error' });
            }
            next(error)
        });
}


exports.insertUser = (req, res, next) => {
    console.log("in contoll",req.body)
    const postDetail = req.body; 
    
    userService.insertUser(postDetail)
        .then((result) => { 
            return res.status(200).json({ success: true, data: result });
        }).catch((error) => { 
            if (error) {
                return res.status(500).json({ success: false, error: 'Internal server error' });
            }
            next(error)
        });
}

function generateAuthToken(userId) {
    try {
        const token = jwt.sign({ id: userId }, 'your-secret-key', { expiresIn: '20s' });
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        return null;
    }
}

exports.userlogin = (req, res, next) => {
    const userDetails = req.body;
    userService.userlogin(userDetails)
        .then((result) => {
            const tokens=generateAuthToken(result.response.user_id)
            return res.status(200).send({ success: true, data: result,token: tokens});
        }).catch((error) => {
            if (error) {
                return res.status(404).json({ success: false, error: 'Internal server error' });
            }
            next(error)
        });
}



exports.adminlogin = (req, res, next) => {
    const adminDetails = req.body;
    userService.adminlogin(adminDetails)
        .then((result) => {
            const tokens=generateAuthToken(result.response.user_id)
            return res.status(200).send({ success: true, data: result,token: tokens});
        }).catch((error) => {
            if (error) {
                return res.status(404).json({ success: false, error: 'Internal server error' });
            }
            next(error)
        });
}

exports.useredit = (req, res, next) => {
    console.log("check user",req)
    const userDetails = {id:req.params.userid,data:req.body};
    userService.useredit(userDetails)
        .then((result) => {
            return res.status(200).send({ success: true, data: result });
        }).catch((error) => {
            if (error) {
                return res.status(404).json({ success: false, error: 'Internal server error' });
            }
            next(error)
        });
}

exports.getStateById = (req, res)=>{
    const pincode = req.params.pincode;
    return userService.getStateById(pincode)
        .then((result) => {
            return res.status(200).send({ success: true, data: result });
        }).catch((error) => {
            console.log("error in controller", error)
            return res.status(500).json({ success: false, error: 'Internal server error' });
        });
}

exports.insertprofile=(req,res,next)=> {
    console.log("check user",req.body,req,req.file,req.params.userid)
    const userDetails = {id:req.params.userid,data:req.body};
    userService.insertprofile(userDetails)
        .then((result) => {
            return res.status(200).send({ success: true, data: result });
        }).catch((error) => {
            if (error) {
                return res.status(404).json({ success: false, error: 'Internal server error' });
            }
            next(error)
        });
}



exports.getrecomdprofile=(req,res)=>{
    return userService.getrecomdprofile()
        .then((result) => {
            return res.status(200).send({ success: true, data: result });
        }).catch((error) => {
            console.log("error in controller", error)
            return res.status(500).json({ success: false, error: 'Internal server error' });
        });
}


exports.getallrecomdprofile=(req,res)=>{
    
    return userService.getallrecomdprofile()
        .then((result) => {
            return res.status(200).send({ success: true, data: result });
        }).catch((error) => {
            console.log("error in controller", error)
            return res.status(500).json({ success: false, error: 'Internal server error' });
        });
}


exports.getsearchprofiledata=(req,res)=>{
    console.log(req,req.body)
    return userService.getsearchprofiledata(req.body)
        .then((result) => {
            return res.status(200).send({ success: true, data: result });
        }).catch((error) => {
            console.log("error in controller", error)
            return res.status(500).json({ success: false, error: 'Internal server error' });
        });
}



exports.getprofilebyid = (req, res)=>{
    const id = req.params.id;
    console.log(req.params)
    return userService.getprofilebyid(id)
        .then((result) => {
            return res.status(200).send({ success: true, data: result });
        }).catch((error) => {
            console.log("error in controller", error)
            return res.status(500).json({ success: false, error: 'Internal server error' });
        });
}



exports.getprofilebyuser = (req, res)=>{
    const id = req.params.id;
    console.log(req.params)
    return userService.getprofilebyuser(id)
        .then((result) => {
            return res.status(200).send({ success: true, data: result });
        }).catch((error) => {
            console.log("error in controller", error)
            return res.status(500).json({ success: false, error: 'Internal server error' });
        });
}


exports.saveprofile = (req, res)=>{
    const id = req.body;
    console.log("params",req.body)
    return userService.saveprofile(id)
        .then((result) => {
            return res.status(200).send({ success: true, data: result });
        }).catch((error) => {
            console.log("error in controller", error)
            return res.status(500).json({ success: false, error: 'Internal server error' });
        });
}



exports.getsaveprofile = (req, res)=>{
    const id = req.query.user_id;
    console.log("params",req,req.query)
    return userService.getsaveprofile(id)
        .then((result) => {
            return res.status(200).send({ success: true, data: result });
        }).catch((error) => {
            console.log("error in controller", error)
            return res.status(500).json({ success: false, error: 'Internal server error' });
        });
}


exports.unsaveprofile = (req, res)=>{
    const id = req.body;
    console.log("params",req.body)
    return userService.unsaveprofile(id)
        .then((result) => {
            return res.status(200).send({ success: true, data: result });
        }).catch((error) => {
            console.log("error in controller", error)
            return res.status(500).json({ success: false, error: 'Internal server error' });
        });
}

exports.deleteuserbyadmin=(req,res,next)=> {
    console.log("check user",req.body,req.params.userid)
    const userDetails = {id:req.params.userid};
    userService.deleteuserbyadmin(userDetails)
        .then((result) => {
            return res.status(200).send({ success: true, data: result });
        }).catch((error) => {
            if (error) {
                return res.status(404).json({ success: false, error: 'Internal server error' });
            }
            next(error)
        });
}






exports.approvedprobyadmin=(req,res,next)=> {
    console.log("check user",req.body,req.params.proid)
    const userDetails = {id:req.params.proid};
    userService.approvedprobyadmin(userDetails)
        .then((result) => {
            return res.status(200).send({ success: true, data: result });
        }).catch((error) => {
            if (error) {
                return res.status(404).json({ success: false, error: 'Internal server error' });
            }
            next(error)
        });
}

exports.deleteprobyadmin=(req,res,next)=> {
    console.log("check user",req.body,req.params.proid)
    const userDetails = {id:req.params.proid};
    userService.deleteprobyadmin(userDetails)
        .then((result) => {
            return res.status(200).send({ success: true, data: result });
        }).catch((error) => {
            if (error) {
                return res.status(404).json({ success: false, error: 'Internal server error' });
            }
            next(error)
        });
}



exports.deleteprofilebyuser=(req,res,next)=> {
    console.log("check user",req.body,req.params.proid)
    const userDetails = {id:req.params.proid};
    userService.deleteprofilebyuser(userDetails)
        .then((result) => {
            return res.status(200).send({ success: true, data: result });
        }).catch((error) => {
            if (error) {
                return res.status(404).json({ success: false, error: 'Internal server error' });
            }
            next(error)
        });
}

exports.getallnotapprovedprofile=(req,res)=>{
    
    return userService.getallnotapprovedprofile()
        .then((result) => {
            return res.status(200).send({ success: true, data: result });
        }).catch((error) => {
            console.log("error in controller", error)
            return res.status(500).json({ success: false, error: 'Internal server error' });
        });
}


exports.savegetintouch = (req, res, next) => {
    console.log("in contoll",req.body)
    console.log("chech data come by frintend",req)
    const postDetail = req.body; 
    
    userService.savegetintouch(postDetail)
        .then((result) => { 
            return res.status(200).json({ success: true, data: result });
        }).catch((error) => { 
            if (error) {
                return res.status(500).json({ success: false, error: 'Internal server error' });
            }
            next(error)
        });
}




exports.showgetintouch=(req,res)=>{
    
    return userService.showgetintouch()
        .then((result) => {
            return res.status(200).send({ success: true, data: result });
        }).catch((error) => {
            console.log("error in controller", error)
            return res.status(500).json({ success: false, error: 'Internal server error' });
        });
}
