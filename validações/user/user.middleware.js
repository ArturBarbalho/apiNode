const Ajv = require('ajv')
const ajv = new Ajv()
const addFormats = require("ajv-formats")
addFormats(ajv)
const userSchema = require('./user.schema')
function validação(req,res,next) {
    const user = req.body
    const validate = ajv.compile(userSchema)
    const valid = validate(user)
    if(valid){next()}
    else{
        res.status(400).json({msg:"dados inválidos", erros: validate.errors})
    }
}
module.exports = validação