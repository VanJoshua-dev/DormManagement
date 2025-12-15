
export const auth_middleware = async (req, res, next) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({success: false, error: true, message: "Missing login crededntials"})
    }

    next();
}