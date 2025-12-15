import auth_model from "../models/auth-model.js";


export const login_controller = async (req, res) => {
    const { username, password } = req.body;

    try {
        const login = await auth_model.find_admin(username, password);
        console.log(login);

        if (login.length === 0) {
           
            return res.status(403).json({success: false, error: true, message: "Invalid Credentials"});
        }
        return res.status(200).json({success: true, error: false, message: "Invalid Credentials", user_data: login});

    } catch (error) {
        console.error(error);
    }
}