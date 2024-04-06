const userModel = require("../../Models/usermodels"); // Adjust the path accordingly
const moment = require('moment');
const service = {};
const userModelobj = new userModel();

service.showallusers = () => {
    console.log("in service")
    return userModelobj.showallusers()
        .then((res) => {  
            console.log("in service")
            return res;           

        }).then((res) => {             
            return res;
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}

service.insertUser =(postDetail)=>{
   console.log("in service",postDetail)
   postDetail ={
    Name:postDetail.fullName,
    email:postDetail.email,
    phone:postDetail.phone,
    password:postDetail.password,
    Active:1,
    createdAt:moment().format('YYYY-MM-DD HH:mm:ss'),
}

    
    return userModelobj.insertUser(postDetail)
        .then((res)=> {
                return res;
        })
        .catch((e)=>{
            return Promise.reject(e);
        });  
}



service.userlogin = (userDetails) => {
    console.log("check login",userDetails)
    userDetails = {
        username: userDetails.emailOrPhone,
        password: userDetails.password
    }
    return userModelobj.userlogin(userDetails)
        .then((res) => {
            if (res && res.length > 0) {
                res = JSON.parse(JSON.stringify(res));
                res = res[0];
                delete res["password"];
                return {
                    status: true,
                    statusCode: "200",
                    statusMessage: "Success", response: res
                };
            } else {
                return {
                    status: false,
                    statusCode: "401",
                    statusMessage: "Unauthorized",
                    response: {}
                };
            }
        }).catch((e) => {
            return {
                status: false,
                statusCode: "404",
                statusMessage: "Not Found",
                response: {},
            };
        });
}



service.adminlogin = (adminDetails) => {
    console.log("check login",adminDetails)
    adminDetails = {
        username: adminDetails.emailOrPhone,
        password: adminDetails.password
    }
    return userModelobj.adminlogin(adminDetails)
        .then((res) => {
            if (res && res.length > 0) {
                res = JSON.parse(JSON.stringify(res));
                res = res[0];
                delete res["password"];
                return {
                    status: true,
                    statusCode: "200",
                    statusMessage: "Success", response: res
                };
            } else {
                return {
                    status: false,
                    statusCode: "401",
                    statusMessage: "Unauthorized",
                    response: {}
                };
            }
        }).catch((e) => {
            return {
                status: false,
                statusCode: "404",
                statusMessage: "Not Found",
                response: {},
            };
        });
}


service.useredit =(postDetail)=>{

    console.log("in service edit",postDetail)
     postDetail={
        Name:postDetail.data.name,
        email:postDetail.data.email,
        phone:postDetail.data.phone,
        id:postDetail.id
    }
     
     return userModelobj.useredit(postDetail)
         .then((res)=> {
                 return res;
         })
         .catch((e)=>{
             return Promise.reject(e);
         });  
 }

 service.getStateById = (pincode) => {
    return userModelobj.getStateById(pincode)
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}





//  insertprofile
service.insertprofile =(postDetail)=>{

    console.log("in service edit",postDetail)
     postDetail={
        Name:postDetail.data.name,
        dob:postDetail.data.dob,
        gender:postDetail.data.gender,
        address:postDetail.data.address,
        email:postDetail.data.email,
        phone:postDetail.data.phone,
        birthtime:postDetail.data.birthTime,
        gotra:postDetail.data.gotra,
        birthPlace:postDetail.data.birthPlace,
        height:postDetail.data.height,
        bodyType:postDetail.data.bodyType,
        color:postDetail.data.color,
        qualification:postDetail.data.qualification,
        degree:postDetail.data.degree,
        occupation:postDetail.data.occupation,
        designation:postDetail.data.designation,
        candidateIncome:postDetail.data.candidateIncome,
        workPlace:postDetail.data.workPlace,
        fatherName:postDetail.data.fatherName,
        fatherMobile:postDetail.data.fatherMobile,
        fatherOccupation:postDetail.data.fatherOccupation,
        fatherIncome:postDetail.data.fatherIncome,
        motherName:postDetail.data.motherName,
        motherOccupation:postDetail.data.motherOccupation,
        familyAddress:postDetail.data.familyAddress,
        image:postDetail.data.image,
        govt_id:postDetail.data.govt_id,
        Active:0,
        Terms_and_cond:1,
        createdAt:moment().format('YYYY-MM-DD HH:mm:ss'),
        user_id:postDetail.id
    }
     
     return userModelobj.insertprofile(postDetail)
         .then((res)=> {
                 return res;
         })
         .catch((e)=>{
             return Promise.reject(e);
         });  
 }

 





 service.getrecomdprofile = () => {
    return userModelobj.getrecomdprofile()
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}



service.getallrecomdprofile = () => {
    return userModelobj.getallrecomdprofile()
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}


service.getsearchprofiledata = (data) => {
    console.log("test",data)
    data={
        gender:data.gender,
        minAge:data.minAge,
        maxAge:data.maxAge,
        gotra:data.gotra
    }
    return userModelobj.getsearchprofiledata(data)
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}



service.getprofilebyid = (id) => {
    return userModelobj.getprofilebyid(id)
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}



service.getprofilebyuser = (id) => {
    return userModelobj.getprofilebyuser(id)
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}



service.saveprofile = (id) => {
    console.log("check sace",id)
    data={
        pro_id:id[0],
        user_id:id[1],
        Active:1,
        createat:moment().format('YYYY-MM-DD HH:mm:ss'),
    }
    return userModelobj.saveprofile(data)
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}



service.getsaveprofile = (id) => {
    
    return userModelobj.getsaveprofile(id)
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}


service.unsaveprofile = (id) => {
    console.log("check sace",id)
    data={
        pro_id:id[0],
        user_id:id[1],
        Active:0,
        
    }
    return userModelobj.unsaveprofile(data)
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}


service.deleteuserbyadmin =(postDetail)=>{

    console.log("in service edit",postDetail)
     postDetail={
        user_id:postDetail.id
    }
     
     return userModelobj.deleteuserbyadmin(postDetail)
         .then((res)=> {
                 return res;
         })
         .catch((e)=>{
             return Promise.reject(e);
         });  
 }

 
service.approvedprobyadmin =(postDetail)=>{

    console.log("in service edit",postDetail)
     postDetail={
        user_id:postDetail.id
    }
     
     return userModelobj.approvedprobyadmin(postDetail)
         .then((res)=> {
                 return res;
         })
         .catch((e)=>{
             return Promise.reject(e);
         });  
 }
 

 service.deleteprobyadmin =(postDetail)=>{

    console.log("in service edit",postDetail)
     postDetail={
        user_id:postDetail.id
    }
     
     return userModelobj.deleteprobyadmin(postDetail)
         .then((res)=> {
                 return res;
         })
         .catch((e)=>{
             return Promise.reject(e);
         });  
 }

 

 service.deleteprofilebyuser =(postDetail)=>{

    console.log("in service edit",postDetail)
     postDetail={
        user_id:postDetail.id
    }
     
     return userModelobj.deleteprofilebyuser(postDetail)
         .then((res)=> {
                 return res;
         })
         .catch((e)=>{
             return Promise.reject(e);
         });  
 }
 

 

 service.getallnotapprovedprofile = () => {
    return userModelobj.getallnotapprovedprofile()
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}


service.savegetintouch =(postDetail)=>{
    console.log("in service",postDetail)
    postDetail ={
     Name:postDetail.fullName,
     email:postDetail.email,
     phone:postDetail.phone,
     msg:postDetail.inquiry,
    
 }
 
     
     return userModelobj.savegetintouch(postDetail)
         .then((res)=> {
                 return res;
         })
         .catch((e)=>{
             return Promise.reject(e);
         });  
 }

 

 service.showgetintouch = () => {
    return userModelobj.showgetintouch()
        .then((res) => {
            return res;
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}
 
 

module.exports = service;