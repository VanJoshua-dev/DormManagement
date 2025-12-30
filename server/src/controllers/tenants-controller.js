import tenants_model from "../models/tenants-model.js";


export const fetch_all_tenants = async (req, res) => {
    const search = req.query.search || "";
    const status = req.query.status || "";
    const move_in_date = req.query.move_in_date || "";

    try {
        const tenants = await tenants_model.get_all_tenants(search, status, move_in_date);

        return res.status(200).json({ success: true, error: false, message: "Successfully fetched tenants", tenants: tenants });
    } catch (error) {
        console.error(error);
    }
}

export const update_payment_status = async (req, res) => {
    const { tenantID, status } = req.body;
    try {
        const updatePayment = await tenants_model.update_payment_status(tenantID, status);

        return res.status(200).json({ success: true, error: false, message: "Succesfully updated tenant payment status", affectedRows: updatePayment })
    } catch (error) {
        return res.status(500).json({ success: false, error: true, message: "Failed to updated tenant payment status", affectedRows: updatePayment })
    }
}

export const remove_tenant = async (req, res) => {
    const { tenantID } = req.params;

    try {
        const tenant = await tenants_model.remove_tenant(tenantID);

        return res.status(200).json({ success: true, error: false, message: "Successfully removed tenant", affectedRow: tenant })
    } catch (error) {
        return res.status(500).json({ success: false, error: true, message: "Failed remove tenant" })
    }
}