class APIError extends Error{
    constructor(statusCode,msg){
        super(msg)
        this.status=statusCode
    }
}

module.exports=APIError