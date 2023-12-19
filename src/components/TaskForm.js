import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask } from '../features/tasks/taskSlice';
import { v4 as uuid } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';

function TaskForm() {
  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const handlerChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      dispatch(editTask(task));
    } else {
      dispatch(
        addTask({
          ...task,
          complete: false,
          id: uuid(),
        })
      );
    }

    navigate('/');
  };

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params.id, tasks]);

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-zinc-800 max-w-sm p-4'
    >
      <label
        htmlFor='title'
        className='block text-xs font-bold mb-2'
      >
        Task
      </label>
      <input
        id='title'
        type='text'
        name='title'
        placeholder='title'
        onChange={handlerChange}
        value={task.title}
        className='w-full text-zinc-600 p-2 rounded-md big-zinc-600 mb-2'
      />
      <label
        htmlFor='description'
        className='block text-xs font-bold mb-2'
      >
        Description
      </label>

      <textarea
        id='description'
        name='description'
        placeholder='description'
        onChange={handlerChange}
        value={task.description}
        className='w-full p-2 text-zinc-600 rounded-md big-zinc-600 mb-2'
      ></textarea>
      <button className='bg-indigo-600 px-2 py-1'>Save</button>
    </form>
  );
}

export default TaskForm;
