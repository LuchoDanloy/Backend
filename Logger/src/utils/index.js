import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const createHash = async (password) =>
{
    return await bcrypt.hash(password, 10)
}

export const isValidPassword = async (password, passwordHash) =>
{
    return await bcrypt.compare(password, passwordHash);
}

export const generateToken = async (user) =>
{
    console.log("ENTRA AL GENERATE TOKEN");
    console.log(process.env.PRIVATE_KEY);
    return jwt.sign({ user: { ...user, password: undefined } }, process.env.PRIVATE_KEY, { expiresIn: '5m' });
}
