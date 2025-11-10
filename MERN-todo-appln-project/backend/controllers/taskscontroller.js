const Task = require('../models/Task');

//get all tasks
exports.getAllTasks = async (req, res,next) => {
    try{
        const alltasks = await Task.find();
        res.status(200).json(alltasks);
    }
    catch(error)
    {
        next(error);
    }
};

// get task by id 
exports.getTaskById = async (req,res,next) =>{
    try{
        const taskById = await Task.findById(req.params.id);
        if(!taskById)
        {
            return res.status(404).json({message:"task not found"});
        }
        res.status(200).json(taskById);
    }
    catch(error)
    {
        next(error);
    }
};

// create new task
exports.createTask =async(req,res,next) => {
    try{
        const {title, description, priority, dueDate} = req.body;
        const newTask = new Task(
            {
             title: title,
             description: description,
             priority: priority  || 'low',
             dueDate: dueDate || null,  
            }
        );

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    }
    catch(error)
    {
        next(error);
    }
};

// update task
exports.updateTask = async (req,res,next) =>{
    try{
        const updates = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            updates,
            {new:true}
        )

        if(!updatedTask)
        {
            return res.status(404).json({message:"task not found"});
        }
        res.status(200).json(updatedTask);
    }
    catch(error)
    {
        next(error);
    }

}

// delete task
exports.deleteTask = async (req, res, next)=>{
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask)
        {
            return res.status(404).json({message:"task not found"});
        }
        res.status(200).json({message:"task deleted successfully"});
    }
    catch(error)
    {
        next(error);
    }
}