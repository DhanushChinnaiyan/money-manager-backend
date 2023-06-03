import { client } from "../db.js";
import { ObjectId } from "mongodb";

export const getIncomes = (request) => {
    return client
    .db("moneyManager")
    .collection("income")
    .find({userId:request.user._id})
    .toArray()
}

export const addincome = (newdata) => {
    return client
    .db("moneyManager")
    .collection("income")
    .insertOne(newdata)
}

export const editIncome = (id,updateddata) => {
    return client
    .db("moneyManager")
    .collection("income")
    .findOneAndUpdate({_id:new ObjectId(id)},{$set:updateddata})
    
}