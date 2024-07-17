import User from "../models/UserModel";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userID) =>{
    return sign({email, userID}, process.env.JWT_KEY, {expiresIn: maxAge});
};

export const signup = async (request,response,next)=>{
    try{
        const {email, password} = request.body;
        if(!email || !password)
        {
            return response.status(400).send("Email and Password are required fields.")
        }
        const user = await User.create({email, passowrd});

        response.cookie("jwt", createToken(email, user.id),{
            maxAge,
            secure: true,
            sameSite: "None"
        })

        return response.status(201).json({
            user:{
                id: user.id,
                email: user.email,
                profileSetup: user.profileSetup
            }
        })


    }catch(err){
        console.log({err});
        return response.status(500).send("Internal Server Error");
    }
}