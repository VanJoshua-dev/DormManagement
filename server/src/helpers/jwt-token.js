import jwt from "jsonwebtoken";



export const generate_access_token = async (user, token) => {
    return jwt.sign(
        { role: user.role, name: user.staffName, username: user.username, email: user.email, userID: user.staffID },
        token,
        { expiresIn: "15m" }
    );
}

export const generate_refresh_token = async (user, token) => {
    return jwt.sign(
        { role: user.role, name: user.full_name, username: user.username, userID: user.id },
        token,
        { expiresIn: "7d" }
    );
}