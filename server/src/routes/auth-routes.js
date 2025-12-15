import express from "express"
// Auth Controllers
import { login_controller } from "../controllers/auth-controller.js";
import { auth_middleware } from "../middlewares/auth-middleware.js";
const router = express.Router();

router.post("/", auth_middleware, login_controller);

router.get("/test", (req, res) => {
    res.send("It is working");
});


export default router;
