import express from "express"
import {getRequests,createRequests,removeRequests,changeRequests,approveRequests} from "../controllers/requestController.js"
const requestRouter = express.Router();

requestRouter.get("/showRequests",getRequests)
requestRouter.post("/createRequests",createRequests)
requestRouter.delete("/removeRequests/:id",removeRequests)
requestRouter.put("/changeRequests/:id",changeRequests)
requestRouter.patch("/approve/:id",approveRequests)
export default requestRouter;