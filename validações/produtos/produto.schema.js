module.exports = {
    type: "object",
    properties: {
        nome: {type: "string"},
        descrição: {type: "string"},
        preço: {type: "number"},
        userId: {type: "integer"},
        
    },
    required: ["nome", "descrição", "preço", "userId"],
    additionalProperties: false  
}
