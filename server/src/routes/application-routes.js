import express from "express"
// Application Controllers
import { fetchAllApplication, submit_application, application_access, update_application_access, reject_application } from "../controllers/application-controller.js";
import { application_form_middleware, update_application_access_middleware, reject_application_middleware } from "../middlewares/application-middlewares.js";
import { room_assignment } from "../controllers/room-assignment-controller.js";
// Application Middlewares

const router = express.Router();

router.get("/", fetchAllApplication);
router.get("/application_access", application_access)
router.post("/new_application", application_form_middleware, submit_application)
router.post("/update_access", update_application_access_middleware, update_application_access)
router.post("/auto_assign", room_assignment)
router.patch("/reject_application", reject_application_middleware, reject_application)
router.get("/test", (req, res) => {
    res.send("It is working");
});


export default router;
