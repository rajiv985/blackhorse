
import User from "../models/user.model.js";   
import sendEmail from "../utils/sendemail.js";  

const register = async (req, res) => {
  const { fullname, email, phonenumber, password } = req.body;

  if (!fullname || !email || !phonenumber || !password) { 
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { phonenumber }],
    });

    if (existingUser) {
      const errorField = existingUser.email === email ? "Email" : "Phonenumber";
      return res.status(400).json({ message: `${errorField} already exists` });
    }

    // ✅ Generate OTP
  const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const otp = generateOTP(); // <--- This CALLS the function and stores the result



    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // valid for 10 mins

    // ✅ Create and save the new user with OTP info
    const newUser = new User({
      fullname,
      phonenumber,
      email,
      password,
      otp,
      otpExpires,
      isVerified: false,
    });

    await newUser.save();

    // ✅ Send OTP to email
    await sendEmail(
      email,
      "Verify Your PharmaConnect Account",
      `Your OTP is ${otp}. It is valid for 10 minutes.`
    );

    res.status(201).json({ message: "User registered. OTP sent to email." });

  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};






// for login 
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User email is not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        return res.status(200).json({ message: "Successfully logged in" });   

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};  

// to verify otp 
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // ✅ Mark user as verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "OTP verified. Account activated!" });

  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};  
 




export {register,login,verifyOTP}   

