 import React ,{useState, useEffect} from 'react';
 import axios from 'axios'; 

 const TaskManager = () => {

    // fetch data
     const [tasks, setTasks] = useState([]);
    // create
     const [title, setTitle] = useState('');
     const [description, setDescription] = useState('');
     const [priority, setPriority] = useState('');
     const [dueDate, setDueDate] = useState('');

     // editing task
     const [editingTask , setEditingTask] = useState(null);

    const fetchTasksAll = async () =>{
         const response = await axios.get('http://localhost:5000/api/todo/All') ;
         console.log('HTTP GET /api/todo/ response:', response);
         setTasks(response.data);       
    }
    useEffect( ()=>{ fetchTasksAll(); }, []);

    // create task
    const createTask = async () =>{
        if (!title)  return alert('title required');
        const response = await axios.post('http://localhost:5000/api/todo/Create',
            {
                title,
                description,
                priority,
                dueDate,
            });
        
        console.log('✅ Task created:',response.data)
         
        setTitle('');
        setDescription('');
        setPriority('');
        setDueDate('');


        fetchTasksAll();
    }

    // delete task
    const deleteTask = async(id)=>{
     await axios.delete(`http://localhost:5000/api/todo/delete/${id}`);
     fetchTasksAll();
    }

    // editing task
    



   return (
     <div>
        <h2>All tasks</h2>
            {tasks.map(
             (task)=>(  
                <div key={task._id}>
                    {task.title} {task.description}  {task.priority} {task.dueDate}

                    <button onClick={()=>deleteTask(task._id)}>delete</button>
                </div>
             )   ) }

        <div>
            <h2>create task</h2>
            <input type='text' placeholder='title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <br/>
            <input type='text' placeholder='description' value={description} onChange={ (e)=>setDescription(e.target.value)}/>
            <br/>
            <select value={priority} onChange={(e)=>setPriority(e.target.value)}> 
                <option value='low'>low</option>
                <option value='medium'>medium</option>
                <option value='high'>high</option>
            </select>
            <br/>
            <input type='date' value={dueDate} onChange={(e)=>setDueDate(e.target.value)}/>
            <br/>
            <button onClick={createTask}>create task</button>
        </div>

         
     </div>
   )
 }
 
 export default TaskManager
 