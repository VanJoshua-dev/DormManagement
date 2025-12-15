import express from "express"
// Application Controllers
import { fetchAllApplication, submit_application, application_access, update_application_access } from "../controllers/application-controller.js";
import { application_form_middleware, update_application_access_middleware } from "../middlewares/application-middlewares.js";
// Application Middlewares

const router = express.Router();

router.get("/", fetchAllApplication);
router.get("/application_access", application_access)
router.post("/new_application", application_form_middleware, submit_application)
router.post("/update_access", update_application_access_middleware, update_application_access)
router.get("/test", (req, res) => {
    res.send("It is working");
});


export default router;
