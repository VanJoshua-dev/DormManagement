export const update_payment_status_middleware = async (req, res, next) => {
    const { tenantID, status } = req.body;

    if (!tenantID, !status) {
        return res.status(400).json({ success: false, error: true, message: "Missing body" });
    }

    next();
}

export const remove_tenant_middleware = async (req, res, next) => {
    const { tenantID } = req.params;
    console.log("TEnant: ", tenantID);

    if (!tenantID) {
        return res.status(400).json({ success: false, error: false, message: "Missing tenant ID" })
    }

    next();
}