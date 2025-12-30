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
        const existingApplication =
            await application_model.check_application(student_id);

        if (existingApplication.length > 0) {
            return res.status(409).json({
                success: false,
                error: true,
                message: "You've already submitted an application"
            });
        }

        const application =
            await application_model.post_application_form(
                student_id,
                first_name,
                last_name,
                gender,
                year_level,
                email,
                contact_number
            );

        return res.status(200).json({
            success: true,
            error: false,
            message: "Your application has been submitted.",
            insertID: application
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Server error"
        });
    }
};


export const application_access = async (req, res) => {
    try {
        const access = await application_model.application_accessibility();

        return res.status(200).json({ success: true, error: false, message: "Form Accessibility", isOpen: access })
    } catch (error) {
        console.error(error);
    }
}

export const update_application_access = async (req, res) => {
    const { status } = req.body; // true / false

    try {
        const access = await application_model.update_application_accessibility(
            status
        );



        return res.status(200).json({
            success: true,
            error: false,
            message: "Application access updated",
            affectedRows: access
        });
    } catch (error) {
        console.error("Update application access error:", error);

        return res.status(500).json({
            success: false,
            error: true,
            message: "Failed to update application access"
        });
    }
};


export const reject_application = async (req, res) => {
    const { status, applicationID } = req.body;

    try {
        const rejectApplication = await application_model.update_application_status(status, applicationID);

        return res.status(200).json({ success: true, error: false, message: `Application has been rejected id: ${applicationID}`, affectedRows: rejectApplication })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: true, message: `Failed to reject applicaiton id: ${applicationID}` })
    }


}