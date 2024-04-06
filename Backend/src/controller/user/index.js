const router   = require('express').Router({
    caseSensitive: true,
    strict       : true
});


const usercontroller=require('./userController');
console.log("in index"),
router.get(

    '/showallusers',
    
    usercontroller.showallusers
);


router.post(
    '/insertuser',
    usercontroller.insertUser
)

router.post(
    '/userlogin',
    usercontroller.userlogin
)

router.post(
    '/adminlogin',
    usercontroller.adminlogin
)

router.post(
    '/useredit/:userid',
    usercontroller.useredit
)

router.post(
    '/insertporfile/:userid',
    usercontroller.insertprofile
)



router.get(
    '/getStateById/:pincode',
    usercontroller.getStateById
)

router.get(
    '/getrecomdprofile',
    usercontroller.getrecomdprofile
)

router.get(
    '/getallrecomdprofile',
    usercontroller.getallrecomdprofile
)

router.post(
    '/getsearchprofiledata',
    usercontroller.getsearchprofiledata
)

router.get(
    '/getprofilebyid/:id',
    usercontroller.getprofilebyid
)

router.get(
    '/getprofilebyuser/:id',
    usercontroller.getprofilebyuser
)

router.post(
    '/saveprofile',
    usercontroller.saveprofile
)

router.get(
    '/getsaveprofile',
    usercontroller.getsaveprofile
)

router.post(
    '/unsaveprofile',
    usercontroller.unsaveprofile
)

router.post(
    '/deleteuserbyadmin/:userid',
    usercontroller.deleteuserbyadmin
)

router.get(
    '/getallnotapprovedprofile',
    usercontroller.getallnotapprovedprofile
)


router.post(
    '/approvedprobyadmin/:proid',
    usercontroller.approvedprobyadmin
)

router.post(
    '/deleteprobyadmin/:proid',
    usercontroller.deleteprobyadmin
)

router.post(
    '/deleteprofilebyuser/:proid',
    usercontroller.deleteprofilebyuser
)

router.post(
    '/savegetintouch',
    usercontroller.savegetintouch
)

router.get(
    '/showgetintouch',
    usercontroller.showgetintouch
)
module.exports = router