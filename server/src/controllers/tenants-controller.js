import tenants_model from "../models/tenants-model.js";


export const fetch_all_tenants = async (req, res) => {
    const search = req.query.search || "";
    const status = req.query.status || "";
    const move_in_date = req.query.move_in_date || "";

    try {
        const tenants = await tenants_model.get_all_tenants(search, status, move_in_date);

        return res.status(200).json({success: true, error: false, message: "Successfully fetched tenants", tenants: tenants});
    } catch (error) {
        console.error(error);
    }
}