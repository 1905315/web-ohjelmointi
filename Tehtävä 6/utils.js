
const handleError=(response,message,code=404)=>{
   response.status(code).json({error:message});
}

module.exports={
   handleError
}
