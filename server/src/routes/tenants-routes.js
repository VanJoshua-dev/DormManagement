import express from "express"
// Tenants Controllers
import { fetch_all_tenants } from "../controllers/tenants-controller.js";

const router = express.Router();

router.get("/", fetch_all_tenants);

router.get("/test", (req, res) => {
    res.send("It is working");
});


export default router;
