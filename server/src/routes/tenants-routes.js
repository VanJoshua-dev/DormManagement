import express from "express"
// Tenants Controllers
import { fetch_all_tenants, update_payment_status, remove_tenant } from "../controllers/tenants-controller.js";
import { update_payment_status_middleware, remove_tenant_middleware } from "../middlewares/tenants-middlewares.js";
const router = express.Router();

router.get("/", fetch_all_tenants);
router.patch("/update_payment", update_payment_status_middleware, update_payment_status);
router.delete("/remove_tenant/:tenantID", remove_tenant_middleware, remove_tenant)
router.get("/test", (req, res) => {
    res.send("It is working");
});


export default router;
