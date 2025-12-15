import dashboard_model from "../models/dashboard-models.js";

export const fetch_dashboard_data = async (req, res) => {
    try {
        const dashboardData = await dashboard_model.get_dashboard_data();

        return res.status(200).json({ success: true, error: false, message: "Successfully fetched dashboard data", dashboard_data: dashboardData });
    } catch (error) {
        console.error("fetch_dashboard_data error in controller ", error);
        return res.status(500).json({ success: true, error: false, message: "Failed to fetch dashboard data" });
    }
}