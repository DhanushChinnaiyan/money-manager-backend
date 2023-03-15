import { client } from "../db.js";
import { ObjectId } from "mongodb";

export const getexpenses = (request) => {
    return client
    .db("moneyManager")
    .collection("expense")
    .find(request.query)
    .toArray()
}

export const addexpense = (newdata) => {
    return client
    .db("moneyManager")
    .collection("expense")
    .insertOne(newdata)
}

export const editexpense = (id,updateddata) => {
    return client
    .db("moneyManager")
    .collection("expense")
    .findOneAndUpdate({_id:new ObjectId(id)},{$set:updateddata})
    
}