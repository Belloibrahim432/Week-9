import express from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/userModel';
import jwt from 'jsonwebtoken'

const router = express.Router();

// Route to handle user registration
router.post('/register', async (req, res) => {
  try {
    const { AuthorName, email, password, PhoneNumber } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = await UserModel.create({
      AuthorName,
      email,
      password: hashedPassword,
      PhoneNumber,
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route to handle user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'SECRET', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
