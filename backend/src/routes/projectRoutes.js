import express from 'express'
import { upload, createProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../controllers/projectController.js';
import { get } from 'mongoose';
console.log('running projectRoutes.js');
const router = express.Router();
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", upload.single("image"), createProject);
router.put("/:id", upload.any(), updateProject);
router.delete("/:id", deleteProject);
export default router;