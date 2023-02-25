const { CreateBoardSchema, UpdateBoardSchema, AddMemberSchema } = require("../requestschema/BoardSchema");
const { UpdateListSchema, CreateListSchema } = require("../requestschema/ListSchema");
const { LoginSchema } = require("../requestschema/LoginSchema");
const RegisterSchema = require("../requestschema/RegisterSchema");

module.exports.FALLBACK_PORT = 3000;
module.exports.TOKEN_VERIFICATION_NOT_REQUIRED_URLS = [
    '/api/user/login',
    '/api/user/register',
]
module.exports.SCHEMA_ENDPOINT_MAPPING = {
    POST: {
        '/api/board/': CreateBoardSchema,
        '/api/board/addMember':AddMemberSchema,
        '/api/user/register':RegisterSchema,
        '/api/user/login': LoginSchema,
        '/api/list/': CreateListSchema,
    },  
    PUT: {
        '/api/board/': UpdateBoardSchema,
        '/api/list/': UpdateListSchema
    }
}