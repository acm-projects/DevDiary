import Project from "../models/Project.js";
import mongoose from "mongoose";


export async function getAllProjects(_, res) {
    try {
        console.log("Fetching projects...");
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    }
    catch (error) {
        console.error("Error fetching projects:", error);

        res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function getProjectById(req, res) {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "Project not found" });
        }

        const project = await Project.findById(req.params.id);

        res.status(200).json(project);
    }
    catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createProject(req, res) {
    try {
        const { title, description, logs, tags } = req.body;

        const project = new Project({ title, 
            description,
            logs,
            tags
            });
        
        
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    }
    catch (error) {
        console.error("Error creating log:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export async function updateProject(req, res) {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "Project not found" });
        }

        const { title, description, logs, tags } = req.body;
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { title, description, logs, tags },
            { 
                new: true, 
                runValidators: true
            }
    );

        res.status(200).json({ message: "Project updated successfully", project: updatedProject });
    }
    catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function deleteProject(req, res) {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "Project not found" });
        }

        const deletedProject = await Project.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Project deleted successfully", project: deletedProject });
    }
    catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};