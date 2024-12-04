import bcrypyt from "bcrypt"
import { model, Model, Schema } from "mongoose";
import { UserDocument } from "../types";

const userSchema = new Schema (
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type:String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type:Boolean,
            required: true,
            default: false
        },

    },
    {
        timestamps:true
    }
);

userSchema.methods.matchPassword = async function  (
    this: any,
    enteredPassword: string
) {
    return await bcrypyt.compare(enteredPassword, this.password)
};
 
userSchema.pre("save", async function (this: UserDocument, next) {
    if(!this.isModified("password")) next();
const salt = await bcrypyt.genSalt(10);
this.password = await bcrypyt.hash(this.password, salt);
})

export const user = model<UserDocument>("User", userSchema)
