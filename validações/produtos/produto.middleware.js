const Ajv = require('ajv')
const ajv = new Ajv()
const addFormats = require("ajv-formats")
addFormats(ajv)
const produtoSchema = require('./produto.schema')

 function validarProduto(req,res,next){
    const produto = req.body
    produto.preço = parseInt(produto.preço)
    const validate = ajv.compile(produtoSchema)
    const valid = validate(produto)
    if(valid){next()}
    else{
        res.status(400).json({msg:"dados invalidos", erros:validate.errors})
    }
}

module.exports = validarProduto