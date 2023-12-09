import ErrorHandler from "../middleware/error.js";
import { Tasks } from "../models/task.js"

export const createTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        const task = await Tasks.create({ title, description, user: req.user._id });

        res.status(201).json({
            success: true,
            message: "Task Created successfully",
            task
        });
    } catch (error) {
        next(error);
    }
}

export const getTasks = async (req, res) => {
    try {
        const tasks = await Tasks.find({ user: req.user._id });

        res.status(200).json({
            success: true,
            tasks
        });
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await Tasks.findOne({ _id: id });

        if (!task)
            return next(new ErrorHandler("Invalid ID", 404));

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task Deleted successfully"
        })
    } catch (error) {
        next(error);
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await Tasks.findOne({ _id: id });

        if (!task)
            return next(new ErrorHandler("Invalid ID", 404));

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated successfully"
        })
    } catch (error) {
        next(error);
    }
}