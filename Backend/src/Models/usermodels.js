const pool = require("../Database/pool")
var upload=require('../multer')
const path = require('path');
const fs = require('fs');
const { time } = require("console");
const crypto = require('crypto');

function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

class Usermodels {
    constructor(pool) {
        this.pool = pool;
        console.log("check pool",this.pool)
    }
    

    showallusers() {
        return new Promise((resolve, reject) => {
            console.log("in model")
            const query="SELECT *, CASE WHEN Active = 0 THEN 'Deleted' WHEN Active = 1 THEN 'Active' ELSE 'Unknown' END AS status FROM user;"
            pool.query( query,  function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {return resolve(results)
                }
          })
        });
    }

    insertUser(Details){
        console.log("in model",Details)

        return new Promise((resolve, reject) => {
            console.log("in model")
            const query="insert into user  (Name,Email,Phone_Number,Password,Active,Create_Time ) values(?,?,?,?,?,?)";
            pool.query( query,[Details.Name,Details.email,Details.phone,Details.password,Details.Active,Details.createdAt]  ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {return resolve(results)
                }
          })
        });

    }


    userlogin(Details){
        console.log("login",Details)
        return new Promise((resolve, reject) => {
            console.log("in model")
            const query ="Select * from user where ( (Email=? ) && Password =? && Active=1 )"
            pool.query( query,[Details.username,Details.password]  ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {return resolve(results)
                }
          })
        });
    }

    adminlogin(Details){
        console.log("login",Details)
        return new Promise((resolve, reject) => {
            console.log("in model")
            const query ="Select * from admin where ( (email=? ) && password =? && Active=1 )"
            pool.query( query,[Details.username,Details.password]  ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {return resolve(results)
                }
          })
        });
    }

    useredit(Details){
        console.log("login",Details)
        return new Promise((resolve, reject) => {
            console.log("in model")
            const query ="update  user set Name=?,Email=?,Phone_Number=? where user_id=?"
            pool.query( query,[Details.Name,Details.email,Details.phone,Details.id]  ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {return resolve(results)
                }
          })
        });
    }

    getStateById(pincode){        
        console.log(pincode);
        return new Promise( (resolve , reject) => {
            const query = `select p.id, p.pincode, p.cityId, c.cityname, p.stateId, s.statename  from pincodes p
            join cities c on p.cityId = c.id
            join states s on p.stateId = s.id where pincode =?  limit 1`;
            pool.query( query,[pincode]  ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {
                    console.log("check data",results)
                    return resolve(results)

                }
          })
        })
    }


    insertprofile(Details){
        console.log("in model user profile",Details)

        return new Promise((resolve, reject) => {
            console.log("in model");
            const query = "INSERT INTO profile (Name, Email, Phone_Number, DOB, Birth_Place, Occupation_type, Occupation_address,Income, User_id, Birth_time, Education, Father_name, Mother_name, Current_address, Gotar, Create_on, Active, gender, complexion, Body_type, Height, Degree_type, Designation, Father_phone, Father_occupation, Father_income, mother_occupation, Family_address, Terms_and_cond, Pro_img, govt_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)";
            
            
            const imageExtension = path.extname(Details.image); // Extract file extension
            
            const atimestamp = new Date().getTime(); // Get current timestamp
            const arandomString = generateRandomString(8); // Generate a random string with 8 characters
            const uniqueFilename = `${atimestamp}_${arandomString}${imageExtension}`;
            
            
            const GovtimageExtension = path.extname(Details.govt_id); // Extract file extension

            const btimestamp = new Date().getTime(); // Get current timestamp
            const brandomString = generateRandomString(8); // Generate a random string with 8 characters
            const GovtuniqueFilename = `${btimestamp}_${brandomString}${GovtimageExtension}`;

           
            pool.query(query, [Details.Name, Details.email, Details.phone, Details.dob, Details.birthPlace, Details.occupation, Details.workPlace, Details.candidateIncome,Details.user_id, Details.birthtime, Details.qualification, Details.fatherName, Details.motherName, Details.address, Details.gotra, Details.createdAt, Details.Active, Details.gender, Details.color, Details.bodyType, Details.height, Details.degree, Details.designation, Details.fatherMobile, Details.fatherOccupation, Details.fatherIncome, Details.motherOccupation, Details.familyAddress, Details.Terms_and_cond, uniqueFilename, GovtuniqueFilename], function (error, results) {
                if (error) {
                    return reject(error);
                } else {
                    const imagePath = path.join(__dirname, "../../public/asset", uniqueFilename); // Construct the path to the asset folder
                    const govtimagepath=path.join(__dirname, "../../public/asset", GovtuniqueFilename);
                    // Write the file to the asset folder
                    fs.writeFile(imagePath, uniqueFilename, (err) => {
                        if (err) {
                            console.error('Error saving image:', err);
                            return reject(err);
                        }

                        console.log('Image saved successfully');
                    });
                    fs.writeFile(govtimagepath, GovtuniqueFilename, (err) => {
                        if (err) {
                            console.error('Error saving image:', err);
                            return reject(err);
                        }

                        console.log('Image saved successfully');
                    });

                    return resolve(results);
                }
            });
        });
        

    }


    getrecomdprofile(){        
        
        return new Promise( (resolve , reject) => {
            const query = ` Select * from profile Where Active=1 limit 3`;
            pool.query( query ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {
                    console.log("check data",results)
                    return resolve(results)

                }
          })
        })
    }

    getallrecomdprofile(){
        return new Promise( (resolve , reject) => {
            const query = ` Select * from profile Where Active=1 `;
            pool.query( query ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {
                    console.log("check data",results)
                    return resolve(results)

                }
          })
        })
    }

    getsearchprofiledata(data){
        return new Promise( (resolve , reject) => {
            const query = ` SELECT *
            FROM shaadi.profile
            WHERE DATE_FORMAT(DOB, '%Y') <= YEAR(CURRENT_DATE() - INTERVAL ? YEAR)
              AND DATE_FORMAT(DOB, '%Y') >= YEAR(CURRENT_DATE() - INTERVAL ? YEAR) and gender=? and gotar!=? `;
            pool.query( query,[data.minAge,data.maxAge,data.gender,data.gotra] ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {
                    console.log("check data",results)
                    return resolve(results)

                }
          })
        })
    }

    getprofilebyid(id){
        console.log(id);
        return new Promise( (resolve , reject) => {
            const query = `SELECT 
            *,
                YEAR(NOW()) - YEAR(DOB) - (RIGHT(NOW(), 5) < RIGHT(DOB, 5)) AS age
                FROM 
           shaadi.profile where Pro_id=? ;`;
            pool.query( query,[id]  ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {
                    console.log("check data",results)
                    return resolve(results)

                }
          })
        })
    }

    getprofilebyuser(id){
        console.log(id);
        return new Promise( (resolve , reject) => {
            const query = `SELECT 
            * from profile where User_id=? and Active=1 ;`;
            pool.query( query,[id]  ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {
                    console.log("check data",results)
                    return resolve(results)

                }
          })
        })
    }

    saveprofile(data){
       
            
        console.log(data)
        return new Promise( (resolve , reject) => {
            const query = "INSERT INTO save ( Pro_id,user_id,Created_at,Active ) VALUES (?,?,?,?)";
            pool.query( query,[data.pro_id,data.user_id,data.createat,data.Active]  ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {
                    console.log("check data",results)
                    return resolve(results)

                }
          })
        })
        
    }


    getsaveprofile(id){
        console.log(id);
        return new Promise( (resolve , reject) => {
            const query = `SELECT * 
            FROM profile 
            WHERE Pro_id IN (
                SELECT Pro_id 
                FROM save 
                WHERE user_id = ? and Active=1
            );`;
            pool.query( query,[id]  ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {
                    console.log("check data",results)
                    return resolve(results)

                }
          })
        })
    }

    unsaveprofile(data){
        console.log(data)
        return new Promise( (resolve , reject) => {
            const query = "update save set Active=0 where user_id=? and Pro_id=?";
            pool.query( query,[data.user_id,data.pro_id]  ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {
                    console.log("check data",results)
                    return resolve(results)

                }
          })
        })  

    }

    deleteuserbyadmin(Details){
        console.log(Details)
        return new Promise( (resolve , reject) => {
            const query = "update user set Active=0 where user_id=?";
            pool.query( query,[Details.user_id]  ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {
                    console.log("check data",results)
                    return resolve(results)

                }
          })
        })  
    }

    getallnotapprovedprofile(){
        return new Promise( (resolve , reject) => {
            const query = ` Select * from profile Where Active=0 `;
            pool.query( query ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {
                    console.log("check data",results)
                    return resolve(results)

                }
          })
        })
    }

    approvedprobyadmin(Details){
        console.log(Details)
        return new Promise( (resolve , reject) => {
            const query = "update profile set Active=1 where Pro_id=?";
            pool.query( query,[Details.user_id]  ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {
                    console.log("check data",results)
                    return resolve(results)

                }
          })
        })  
    }
    deleteprobyadmin(Details){
        console.log(Details)
        return new Promise( (resolve , reject) => {
            const query = "update profile set Active=2 where Pro_id=?";
            pool.query( query,[Details.user_id]  ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {
                    console.log("check data",results)
                    return resolve(results)

                }
          })
        })  
    }

    deleteprofilebyuser(Details){
        console.log(Details)
        return new Promise( (resolve , reject) => {
            const query = "update profile set Active=2 where Pro_id=?";
            pool.query( query,[Details.user_id]  ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {
                    console.log("check data",results)
                    return resolve(results)

                }
          })
        })  
    }


    savegetintouch(Details){
        console.log("in model",Details)

        return new Promise((resolve, reject) => {
            console.log("in model")
            const query="insert into contact  (name,email,phone,msg ) values(?,?,?,?)";
            pool.query( query,[Details.Name,Details.email,Details.phone,Details.msg]  ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {return resolve(results)
                }
          })
        });

    }

    showgetintouch(){
        return new Promise( (resolve , reject) => {
            const query = ` Select * from contact group by id desc`;
            pool.query( query ,function(error, results){
                if(error)
                { return reject(error);
                }
                else
                {
                    console.log("check data",results)
                    return resolve(results)

                }
          })
        })
    }


    
    
}

module.exports = Usermodels;