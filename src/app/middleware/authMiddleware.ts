import { NextFunction, Request, Response } from "../types";
import jwt, {JwtPayload, Secret} from "jsonwebtoken";
import { User } from "../models";
import asyncHandler from "express-async-handler"

const protect =  asyncHandler(
    async(req:Request, res:Response, next:NextFunction) => {
        let token; 

        const secret: Secret = process.env.JWT_SECRET!;

        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            try {
                token = req.headers.authorization.split(" ") [1];

                const decoded = jwt.verify(token, secret) as JwtPayload;

                const user = await User.findById(decoded.id).select("-password");

                if(!User){
                    res.status(401);
                    throw new Error("User not found")
                }

                req.user = {
                    _id: user?._id,
                    name: user?.name,
                    email:user?.email,
                    isAdmin:user?.isAdmin,

                };
                next();

            } catch (error) {
                console.log(error);
                res.status(401);
                throw new Error("Not authorized, token failed")
            }
        }

        if (!token) {
            res.status(401);
            throw new Error ("Not authorized, no token")
        }
    }
)

const admin = (req:Request, res:Response, next:NextFunction) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an admin")
    }
}

export {protect, admin }