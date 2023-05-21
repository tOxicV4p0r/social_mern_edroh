import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
    console.log('auth/register')
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGGIN IN */
export const login = async (req, res) => {
    console.log('auth/login')
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User does not exist." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) res.status(400).json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )

        const formattedFriends = friends.map(
            ({
                _id, firstName, lastName, occupation, location, picturePath
            }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            });

        delete user._doc.password;
        res.status(200).json({ token, user: { ...user._doc, friends: formattedFriends } });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};