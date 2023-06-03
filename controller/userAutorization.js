import jwt from "jsonwebtoken"
import { client } from "../db.js"
import { ObjectId } from "mongodb"

// finding user
const user = async(id) => {
    return client
    .db("moneyManager")
    .collection("users")
    .findOne({_id:new ObjectId(id)})
}
export const isUserSignedIn = async(request,response,next) => {
    if(request.headers){
        try {
            const loginToken = request.headers["x-auth-user"]
            const decode = jwt.verify(loginToken,"12^%#WE&^%!@$fsdghsjdhgf67513465")
            request.user = await user(decode.id)
            next()
        } catch (error) {
            console.log("Header customer error",error)
            response.status(401).json({message:"Invalid Authorization"})
        }
    }
}