import auth_model from "../models/auth-model.js";
import cookie from "cookie";
import { generate_refresh_token, generate_access_token } from "../helpers/jwt-token.js";
import { env_utils } from "../utils/env-utils.js";

export const login_controller = async (req, res) => {
    const { username, password } = req.body;

    try {
        const login = await auth_model.find_admin(username, password);
        console.log(login);

        if (login.length === 0) {
           
            return res.status(403).json({success: false, error: true, message: "Invalid Credentials"});
        }

        const refreshToken = await generate_refresh_token(login, env_utils().REFRESH_TOKEN)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({success: true, error: false, message: "Invalid Credentials", user_data: login});

    } catch (error) {
        console.error(error);
    }
}