// authRoutes.js
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Fetchuser = require("../middleware/Fetchuser");

const JWT_SECRET = "Vishalisagood$boy";
// const JWT_SECRET = 'Vishalisagood$boy';



//Route 1: Create a user using: POST "/api/auth/createuser" no login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password is too short").isLength({ min: 4 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

//Route 2: Authenticate a user using: POST "/api/auth/login" no login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3: Get logged-in user details: POST "/api/auth/getuser" login required
router.get("/getuser", Fetchuser, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  });


  // router.post(
  //   "/api/auth/updatebackground",
  //   upload.single("backgroundImage"),
  //   async (req, res) => {
  //     try {
  //       // Implement logic to update user background image in the database
  //       const userId = req.user._id;
  //       const imageUrl = `/uploads/${req.file.filename}`;
  //       await User.findByIdAndUpdate(userId, { backgroundUrl: imageUrl });
  
  //       res.json({
  //         success: true,
  //         message: "Background image updated successfully",
  //       });
  //     } catch (error) {
  //       console.error("Error updating background image:", error);
  //       res
  //         .status(500)
  //         .json({ error: "Internal Server Error", details: error.message });
  //     }
  //   }
  // );
  
  // router.post(
  //   "/api/auth/updateavatar",
  //   upload.single("avatarImage"),
  //   async (req, res) => {
  //     try {
  //       // Implement logic to update user avatar image in the database
  //       const userId = req.user._id; // Assuming you have authentication middleware
  //       const imageUrl = `/uploads/${req.file.filename}`;
  //       await User.findByIdAndUpdate(userId, { avatarUrl: imageUrl });
  
  //       res.json({ success: true, message: "Avatar image updated successfully" });
  //     } catch (error) {
  //       console.error("Error updating avatar image:", error);
  //       res
  //         .status(500)
  //         .json({ error: "Internal Server Error", details: error.message });
  //     }
  //   }
  // );
  
module.exports = router;
