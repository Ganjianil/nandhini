const model = require("../model/searchdata");
const uploadmodel = require("../model/uploadschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Ensure you install this package

// Signup Controller
const signup = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;

    // Validate required fields
    if (!name || !email || !number || !password) {
      return res.status(400).json({ message: "Enter all details" });
    }

    // Check for duplicate email or phone number
    const existingEntry = await model.findOne({
      $or: [
        { email: { $regex: new RegExp(`^${email}$`, "i") } },
        { number },
      ],
    });
    if (existingEntry) {
      return res
        .status(400)
        .json({ message: "Email or phone number already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new entry
    const newEntry = new model({
      name,
      email,
      number,
      password: hashedPassword,
    });
    await newEntry.save();

    return res.status(201).json({ message: "Saved in database successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    return res
      .status(500)
      .json({ message: "Error while entering details during signup" });
  }
};


// Login Controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Backend - Received email:", email);
    console.log("Backend - Received password:", password);

    // Use the correct model reference
    const user = await model.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials: User not found" });
    }

    // Validate password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials: Incorrect password" });
    }

    // Generate JWT token (ensure generateToken is properly implemented)
    const token = jwt.sign({ email: user.email, id: user._id }, "your_secret_key", {
      expiresIn: "2h",
    });

    console.log("Backend - Sending response:", { email: user.email, token });

    res.json({ email: user.email, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login" });
  }
};

// Upload Controller
const upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const filePath = `/upload/${req.file.filename}`;

    const { category, price, discription } = req.body;
    if (!category || !price || !discription) {
      return res.status(400).json({ message: "Update all details" });
    }

    // Check for duplicate category (case-insensitive)
    const duplicateEntry = await uploadmodel.findOne({
      category: { $regex: new RegExp(`^${category}$`, "i") },
    });
    if (duplicateEntry) {
      return res.status(400).json({ message: "Already we have the same entry" });
    }

    const newdata = new uploadmodel({
      category,
      price,
      discription,
      image: filePath,
    });
    await newdata.save();

    return res.status(201).json({
      message: "Saved in database",
      data: { category, price, discription, image: filePath },
    });
  } catch (err) {
    console.error("Error while uploading:", err);
    return res.status(500).json({ message: "Error while uploading" });
  }
};

// Get Uploads Controller
const getuploads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const data = await uploadmodel
      .find({})
      .skip((page - 1) * limit)
      .limit(limit);

    if (!data || data.length === 0) {
      return res.status(200).json([]); // Explicitly return an empty array
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching uploads:", error);
    return res.status(500).json({ message: "Error fetching uploads" });
  }
};

// Delete Single Upload
const deleteupload = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteditems = await uploadmodel.findByIdAndDelete(id);
    if (!deleteditems) {
      return res.status(404).json({ message: "Item not found for deletion" });
    }
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error while deleting:", error);
    return res.status(500).json({ message: "Error while deleting" });
  }
};

// Delete All Uploads
const deleteAllUploads = async (req, res) => {
  try {
    const deletedItems = await uploadmodel.deleteMany({});
    if (deletedItems.deletedCount === 0) {
      return res.status(404).json({ message: "No items found to delete" });
    }
    return res.status(200).json({
      message: "All items deleted successfully",
      deletedCount: deletedItems.deletedCount,
    });
  } catch (error) {
    console.error("Error while deleting all items:", error);
    return res.status(500).json({ message: "Error while deleting all items" });
  }
};

// Update Upload Controller
// Update Upload Controller (REMOVE THIS)
const updateUpload = async (req, res) => { 
  try {
    const { id } = req.params;
    const { category, price, discription, image } = req.body;

    console.log("Update request received for ID:", id);

    const updatedItem = await uploadmodel.findByIdAndUpdate(
      id,
      { category, price, discription, image },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    console.log("Updated item:", updatedItem);
    return res
      .status(200)
      .json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    console.error("Error while updating item:", error);
    return res.status(500).json({ message: "Error while updating item" });
  }
};

module.exports = {
  signup,
  upload,
  getuploads,
  deleteupload,
  deleteAllUploads,
  updateUpload,
  login,
};