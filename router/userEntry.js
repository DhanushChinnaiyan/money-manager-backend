import express from "express";
import bcrypt from "bcrypt";
import {
  addToken,
  getToken,
  newToken,
  newUser,
  resetPassword,
  tokenExpireAt,
  userVerification,
} from "../controller/userEntry.js";
import { mail } from "../Emailscript.js";

const router = express.Router();

// Signup method
router.post("/signup", async (request, response) => {
  try {
    // verifying user
    const user = await userVerification(request.body.email);
    // sending response if user is not valid
    if (user)
      return response.status(400).json({ message: "User already exist" });
    // generating hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);
    // user details
    const userDetails = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: hashedPassword,
    };
    // adds new data to mongodb
    await newUser(userDetails);
    // sending response
    response.status(200).json({ message: "User signuped successfully " });
  } catch (error) {
    console.log("Signup error", error);
  }
});

// Login method
router.post("/login", async (request, response) => {
  try {
    // verifying user
    const user = await userVerification(request.body.email);
    // sends a response if user is not valid
    if (!user)
      return response
        .status(400)
        .json({ message: "Incorrect user email or password" });
    //   validates user password
    const validatePassword = await bcrypt.compare(
      request.body.password,
      user.password
    );
    // sends a response if the password is incorrect
    if (!validatePassword)
      return response
        .status(400)
        .json({ message: "Incorrect user email or password" });

    // Token generation
    const token = newToken(user._id);
    // sending  response
    response
      .status(200)
      .json({ message: "User successfully logged in", Token: token });
  } catch (error) {
    console.log("Login error", error);
  }
});

// forgot password
// (1) sending email method
router.post("/sendmail", async (request, response) => {
  try {
    // verifying user
    const user = await userVerification(request.body.email);
    // sends a response if user is not valid
    if (!user) return response.status(400).json({ message: "User not valid" });
    //seinding mail to user
    const token = newToken(user._id);
    const userEmail = user.email;
    const url = `https://money-manager-frontend-webcode.netlify.app/forgotpassword/${token}`;
    mail(url, userEmail);
    // adding token to token collection in mongodb
    const tokenDetails = {
      email: user.email,
      token: token,
      createdAt: new Date(),
    };
    await addToken(tokenDetails);
    // token expires after 5 min
    await tokenExpireAt();
    // sending response
    response.status(200).json({ message: "Mail has been sent to your email" });
  } catch (error) {
    console.log("Email sending error", error);
  }
});

// (2) resets the password
router.put("/resetpassword/:mail", async (request, response) => {
  try {
    // verifying user
    const user = await userVerification(request.params.mail);
    // sends a response if user is not valid
    if (!user) return response.status(400).json({ message: "User not valid" });
    // changing the password
        // hashed password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(request.body.password,salt)
        // password details
         resetPassword(userToken.email,hashedPassword)
    // sending response
    response.status(200).json({message:"Your password has been successfully changed"})
         
  } catch (error) {
    console.log("password reseting error", error);
  }
});

// url token verification
router.get("/urltoken/:token",async(request,response)=>{
      const user = await getToken(request.params.token);
      if(!user) return response.status(400).json({message:"URL not valid"})
      response.status(200).json({message:"You can reset your password now",user:user})
})

export const userEntryRouter = router;
