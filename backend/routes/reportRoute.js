import express from "express"
import {createReport,displayReport,updateReport} from "../controllers/reportController.js"

const reportRouter = express.Router();

reportRouter.post("/create-report",createReport)
reportRouter.get("/display-report",displayReport)
reportRouter.put("/update-report/:id",updateReport)

export default reportRouter;