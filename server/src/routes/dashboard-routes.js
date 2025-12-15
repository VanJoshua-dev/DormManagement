import express from "express"
// Dashboard Controllers
import { fetch_dashboard_data } from "../controllers/dashboard-controller.js";
const router = express.Router();

router.get("/", fetch_dashboard_data);

router.get("/test", (req, res) => {
    res.send("It is working");
});


export default router;
