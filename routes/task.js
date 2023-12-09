import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Router();

router.post("/create", isAuthenticated, createTask);
router.get("/all", isAuthenticated, getTasks);
router.route("/:id").delete(isAuthenticated, deleteTask).put(isAuthenticated, updateTask);

export default router;