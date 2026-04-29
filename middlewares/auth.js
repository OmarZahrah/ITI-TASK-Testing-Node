const jwt=require('jsonwebtoken')
 const {promisify} =require('util')
const  APIError   = require('../utilities/errors')

//authentication
async function auth(req, res, next) {
  
  try{
      if (!req.headers.authorization) {
         throw new APIError(401, 'you have not access , please login first' )
      }
      else{
        const decoded = await promisify(jwt.verify)(req.headers.authorization,process.env.SECRET)
        req.id=decoded.id
    
        next()
      }
    }catch(err){

      next( err)
    }
 
}

module.exports = auth