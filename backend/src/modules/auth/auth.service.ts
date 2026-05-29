import { ObjectId } from "mongodb";
import { getDb } from "../../config/db";
import { User } from "./auth.model";
import bcrypt from "bcrypt";
import { toObjectId } from "../../utils/objectId";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class AuthService {
    static async signin(email: string, password: string) {
        const db = getDb();
        const user = await db.collection<User>('user').findOne({
            email: email
        });

        if (!user) {
            return { user: null, isMatch: false };
        }

        const isMatch = await bcrypt.compare(password, user.password);


        const payload = { email: email, role: user.role };
        const secret = process.env.JWT_SECRET as string;

        const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
        });
        
        // console.log('Access Token:', token);
        
        return { user, isMatch, token };
    }
    
    static async signup(email: string, password: string, role?: "admin" | "user" | "guest") {
        const db = getDb();
        const alreadyUser = await db.collection<User>('user').findOne({ email: email });
        
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser: User = {
            email,
            password: hashedPassword,
            role: role || "user"
        };
        
        const result = await db.collection<User>('user').insertOne(newUser);
        
        const payload = { email: email, role: newUser.role };
        const secret = process.env.JWT_SECRET as string;
    
        const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
        });

        return { alreadyUser, result, token };
    }

    static async getAllUser() {
        const db = getDb();
        const allUsers = await db.collection<User>('user')
            .find({})
            .project<Omit<User, 'password'>>({ password: 0 })
            .toArray();
        return allUsers;
    }

    static async getUser(userId: string) {
        const db = getDb();
        return await db.collection<User>('user').findOne(
            { _id: toObjectId(userId, 'user ID') },
            { projection: { password: 0 } }
        );
    }
}
