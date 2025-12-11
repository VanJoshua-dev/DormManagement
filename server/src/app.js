import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();
const corsOptions = { origin: "http://localhost:5173", credentials: true, };
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

import rooms_route from "./routes/rooms-routes.js"





app.use("/api/rooms", rooms_route);

app.get("/", (req, res) => {
  res.send(`<h1 style='color: blue; width: 100%; height: 100vh; text-align: center; font-size: 70px; display: flex; justify-content: center; align-items: center;'>Server is Running...</h1>`);
});


// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

export default app;