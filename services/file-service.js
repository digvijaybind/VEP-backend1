const fs = require('fs');

class FileService {

    delete = async (filePath) =>
    {
        try{
            fs.unlink(filePath,(err)=>{
                err? console.log(err) : console.log('file removed');
            })
        }
        catch(err)
        {
            console.log(err);

        }
    } 

}

module.exports = new FileService();

