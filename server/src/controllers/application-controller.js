import application_model from "../models/application-model.js";

export const fetchAllApplication = async (req, res) => {
    const search = req.query.search || "";
    const status = req.query.status || "";
    const applied_date = req.query.date || "";

    try {
        const applications = await application_model.get_applications(search, status, applied_date);

        return res.status(200).json({ success: true, error: false, message: "Successfully fetched applications.", applications: applications });
    } catch (error) {
        console.error("fetchAllApplication error ", error);
    }
}

export const submit_application = async (req, res) => {
    const {
        student_id,
        first_name,
        last_name,
        gender,
        year_level,
        email,
        contact_number
    } = req.body;

    try {
        const checkApplication = await application_model.check_application();
        if (checkApplication.length != 0) {
            if (checkApplication.student_id_number === student_id) {
                return res.status(409).json({ success: false, error: true, message: "You've already submitted a application" })
            }

            const application = await application_model.post_application_form(student_id, first_name, last_name, gender, year_level, email, contact_number);
            return res.status(200).json({ success: true, error: false, message: "You're application has been sumitted.", insertID: application });
        }





    } catch (error) {
        console.error("Error: ", error);
    }
}

export const application_access = async (req, res) => {
    try {
        const access = await application_model.application_accessibility();

        return res.status(200).json({success: true, error: false, message: "Form Accessibility", isOpen: access})
    } catch (error) {
        console.error(error);
    }
}

export const update_application_access = async (req, res) => {
    const {status} = req.body;
    try {
        const access = await application_model.update_application_accessibility(status);

        return res.status(200).json({success: true, error: false, message: "Form Accessibility", affectedRows: access})
    } catch (error) {
        console.error(error);
    }
}