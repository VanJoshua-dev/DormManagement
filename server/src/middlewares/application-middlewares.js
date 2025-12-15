



// export const get_application_middleware = async (req, res) => {
//     const search = req.query.search;
// }

export const application_form_middleware = async (req, res, next) => {
    const {
        student_id,
        first_name,
        last_name,
        gender,
        year_level,
        email,
        contact_number
    } = req.body;

    if (!student_id || !first_name || !last_name || !gender || !year_level || !email || !contact_number) {
        return res.status(400).json({ success: false, error: true, message: "Missing field." })
    }

    next();
}

export const update_application_access_middleware = async (req, res, next) => {
    const { status } = req.body;

    console.log(status);
    
    if (status === "") {
        return res.status(400).json({ success: false, error: true, message: "Missing status" })
    }
    next();
}