import Project from "../models/Project.js";
import mongoose from "mongoose";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage });


export async function getAllProjects(_, res) {
    try {
        console.log("Fetching projects...");
        const projects = await Project.find().sort({ createdAt: -1 });
        // projects.forEach((project) => {console.log(project); if(project.image) {console.log(project.image.contentType); console.log(project.image.data.toString("base64"))}});

        const formatted = projects.map((project) => (
        {
            id: project._id,
            title: project.title,
            description: project.description,
            logs: project.logs,
            tags: project.tags,
            emoji: project.emoji,
            image: project.image && project.image.data ?
            `data:${project.image.contentType};base64,${project.image.data.toString("base64")}`:
            null,
        }));

        res.status(200).json(formatted);
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
        const formatted = {
            id: project._id,
            title: project.title,
            description: project.description,
            logs: project.logs,
            tags: project.tags,
            emoji: project.emoji,
            image: project.image && project.image.data ?
            `data:${project.image.contentType};base64,${project.image.data.toString("base64")}`:
            null,
        };
        console.log(formatted);
        res.status(200).json(formatted);
    }
    catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createProject(req, res) {
    try {
        const { title, description, logs, tags, emoji } = req.body;
        let image = null;
        if (req.file) image = {data: req.file.buffer, contentType: req.file.mimetype};

        const project = new Project({ 
            title, 
            description,
            logs,
            tags,
            emoji,
            image
            });
        
        
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    }
    catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export async function updateProject(req, res) {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ message: "Project not found" });
        }
        console.log(req);
        // console.log("body: ",req.body);
        const { title, description, logs, emoji, tags} = req.body;
        let image;
        if (req.files && req.files.length > 0) {
            image = {data: req.files[0].buffer, contentType: req.files[0].mimetype};
        }
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { title, description, logs, tags, emoji, image },
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