import { Request, Response} from "express";
// import { v4 as uuidv4 } from 'uuid';
import UserModel from "../models/userModel";
import bcrypt from 'bcrypt';

export async function loginUser(req:Request, res:Response) {
  const { email, password } = req.body;

  try {
    
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function createUser(req:Request, res:Response) {
  

  try {
    const { AuthorName,
      email,
      password,
      PhoneNumber } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = await UserModel.create({
      AuthorName,
      email,
      password: hashedPassword, 
      PhoneNumber
    });

    
    return res.status(201).json({ message: 'User created successfully', user: newUser });

  } catch (error) {
    console.error('User creation error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
