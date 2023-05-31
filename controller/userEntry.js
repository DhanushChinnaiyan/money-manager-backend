import { client } from "../db.js";
import jwt from "jsonwebtoken";

// Signup method
export const newUser = (userDetails) => {
    return client
    .db("moneyManager")
    .collection("users")
    .insertOne(userDetails)
}

// reset password method
export const resetPassword = (usermail,newpassword) => {
    return client
    .db("moneyManager")
    .collection("users")
    .findOneAndUpdate({email:usermail},{$set:{password:newpassword}})
}

// User Verification
export const userVerification = (usermail) => {
    return client
    .db("moneyManager")
    .collection("users")
    .findOne({email:usermail})
}

// JWT Token generation
export const newToken = (id) => {
  return jwt.sign({id},"12^%#WE&^%!@$fsdghsjdhgf67513465")
}

// adding new token
export const addToken = (tokenDetails) =>{
    return client
    .db("moneyManager")
    .collection("tokens")
    .insertOne(tokenDetails)   
}

// The token collection document expires after 5 minutes
export const tokenExpireAt = () => {
    return client
    .db("moneyManager")
    .collection("tokens")
    .createIndex({createAt:1},{expireAfterSeconds:60*5})
}

// get token method
export const getToken = (token) => {
    return client
    .db("moneyManager")
    .collection("tokens")
    .findOne({token:token})
}