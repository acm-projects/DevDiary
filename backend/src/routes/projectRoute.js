import express from 'express';
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projControllers.js';
import { get } from 'mongoose';

console.log('running projectRoutes.js');

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);

router.post("/", createProject);

router.put("/:id", updateProject); 

router.delete("/:id", deleteProject);
export default router;