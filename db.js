import { MongoClient } from "mongodb";
import Obj from "mongodb";



const createConnection = async() => {
    const client = new MongoClient("mongodb+srv://dhanush:621417114021@cluster0.yv1vvqj.mongodb.net/?retryWrites=true&w=majority");
    await client.connect();
    console.log("mongodb connected")
    // token expires after 5 min
    await tokenExpireAt();
    return client
}

export var ObjectId = Obj.ObjectId;
export const client = await createConnection();