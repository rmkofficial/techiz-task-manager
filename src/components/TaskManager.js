// src/components/TaskManager.js
"use client";

import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskTitle, setEditTaskTitle] = useState('');

    useEffect(() => {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(() => toast.error('Görevler yüklenemedi.'));
    }, []);

    const handleAddTask = () => {
        if (newTask.trim() === '') {
            toast.error('Görev başlığı boş olamaz.');
            return;
        }

        const task = { title: newTask };

        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
            .then(response => response.json())
            .then(data => {
                setTasks([...tasks, data]);
                setNewTask('');
                toast.success('Görev başarıyla eklendi!');
            })
            .catch(() => toast.error('Görev eklenemedi.'));
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

        fetch('/api/tasks', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: editTaskId, title: editTaskTitle }),
        })
            .then(response => response.json())
            .then(updatedTask => {
                setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
                setEditTaskId(null);
                setEditTaskTitle('');
                toast.success('Görev başarıyla güncellendi!');
            })
            .catch(() => toast.error('Görev güncellenemedi.'));
    };

    const handleDeleteTask = (id) => {
        fetch('/api/tasks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
            .then(() => {
                setTasks(tasks.filter(task => task.id !== id));
                toast.success('Görev başarıyla silindi!');
            })
            .catch(() => toast.error('Görev silinemedi.'));
    };

    return (
        <Box>
            <Typography variant="h4">Görev Yönetimi</Typography>
            <Box sx={{ mt: 2 }}>
                <TextField
                    label="Yeni Görev"
                    variant="outlined"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <Button variant="contained" sx={{ ml: 2 }} onClick={handleAddTask}>
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
