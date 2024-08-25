"use client"; 

import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import useStore from '../store'; 

const TaskManager = () => {
    const { tasks, addTask, removeTask, updateTask, setTasks } = useStore(); 
    const [newTask, setNewTask] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskTitle, setEditTaskTitle] = useState('');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, [setTasks]);

    const handleAddTask = () => {
        if (newTask.trim() === '') {
            toast.error('Görev başlığı boş olamaz.');
            return;
        }

        const newTaskEntry = { id: new Date().getTime(), title: newTask };
        addTask(newTaskEntry);
        setNewTask('');
        toast.success('Görev başarıyla eklendi!');
    };

    const handleEditTask = (id, title) => {
        setEditTaskId(id);
        setEditTaskTitle(title);
    };

    const handleUpdateTask = () => {
        if (editTaskTitle.trim() === '') {
            toast.error('Görev başlığı boş olamaz.');
            return;
        }

        updateTask({ id: editTaskId, title: editTaskTitle });
        setEditTaskId(null);
        setEditTaskTitle('');
        toast.success('Görev başarıyla güncellendi!');
    };

    const handleDeleteTask = (id) => {
        removeTask(id);
        toast.success('Görev başarıyla silindi!');
    };

    return (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h5">Görev Yönetimi</Typography>
            <Box sx={{ mt: 2 }}>
                <TextField
                    label="Yeni Görev"
                    variant="outlined"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    sx={{ mr: 2 }}
                />
                <Button variant="contained" onClick={handleAddTask}>
                    Ekle
                </Button>
            </Box>
            <List sx={{ mt: 2 }}>
                {tasks.map(task => (
                    <ListItem key={task.id} secondaryAction={
                        <>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditTask(task.id, task.title)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    }>
                        {editTaskId === task.id ? (
                            <TextField
                                variant="outlined"
                                value={editTaskTitle}
                                onChange={(e) => setEditTaskTitle(e.target.value)}
                                onBlur={handleUpdateTask}
                                autoFocus
                            />
                        ) : (
                            <ListItemText primary={task.title} />
                        )}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TaskManager;
