import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { completedTask, deleteTask } from '../features/tasks/taskSlice';
import { Link } from 'react-router-dom';

function TaskList() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleComplete = (id) => {
    dispatch(completedTask(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className='w-4/6'>
      <header className='flex justify-between items-center py-4'>
        <h1>Task {tasks.length}</h1>
        <Link
          to='/create-task'
          className='bg-indigo-600 px-2 py-1 rounded-sm text-sm'
        >
          Create Task
        </Link>
      </header>
      <div className='grid grid-cols-3 gap-4'>
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-md ${
              task.complete ? 'bg-lime-600' : 'bg-neutral-800 '
            }`}
            onClick={() => handleComplete(task.id)}
          >
            <header className='flex justify-between'>
              <h3>{task.title}</h3>
              <div className='flex gap-x-2'>
                <Link
                  className='bg-zinc-600 px-2 py-1 text-xs rounded-md'
                  to={`/edit-task/${task.id}`}
                >
                  Edit
                </Link>

                <button
                  className='bg-red-500 px-2 py-1 text-xs rounded-md'
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </header>

            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
