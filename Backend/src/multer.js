var multer=require('multer')
var store = multer.diskStorage(
    {
        destination:(req,file,path)=>
        {
            path(null,'public/asset')
        },
        filename:(req,file,path)=>
        {
            path(null,file.originalname)
        }
    }
)
var upload=multer({storage:store})

module.exports=upload;