import asyncHandler from "../middleware/ErrorHandler.js"
import Project from "../model/projectSchema.js"


export const createProject = asyncHandler(async (req, res) => {
    const { title, description, image } = req.body;
    if (!title || !description || !image) {
        res.status(404);
        throw new Error("please fill all the inputs");
    }
    else {
        const newProject = await new Project({ title, description, image }).save();
        if (!newProject) {
            res.status(404);
            throw new Error("something went wrong")
        }
        res.status(200).json(newProject);
    }
})
export const updateProject = asyncHandler(async (req, res) => {
    const { title, description, image } = req.body;
    const id = req.params.id;
    console.log("asdfghj");

    const existingProject = await Project.findById(id);
    console.log(existingProject);
    if (!existingProject) {
        res.status(404);
        throw new Error("Project does not found");
    }
    else {
        existingProject.title = title || existingProject.title;
        existingProject.description = description || existingProject.description;
        existingProject.image = image || existingProject.image;


        await existingProject.save();
        res.status(200).json(existingProject);
    }
})

export const projectById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const project = await Project.findById(id);
    if (!project) {
        res.status(404);
        throw new Error("project does not found");
    }
    else {
        res.status(200).json(project);
    }
})

export const allProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({}).limit(6).sort("-createdAt");
    res.status(200).json(projects);
})

export const deleteProject = asyncHandler(async (req, res) => {
    const id = req.params.id;
    await Project.findByIdAndDelete(id);
    res.status(200).json("Project deleted successfully");
})