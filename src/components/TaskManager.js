"use client";

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, IconButton, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import useStore, { useLoadTasks } from '../store';

const TaskManager = () => {
    const {
        tasks,
        addTask,
        removeTask,
        updateTask,
        updateTaskStatus,
        searchTerm,
        filterStatus,
        setSearchTerm,
        setFilterStatus,
    } = useStore();
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskStatus, setNewTaskStatus] = useState('todo');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskTitle, setEditTaskTitle] = useState('');
    const [editTaskDescription, setEditTaskDescription] = useState('');
    const [editTaskStatus, setEditTaskStatus] = useState('');
    const [open, setOpen] = useState(false);

    useLoadTasks();

    const handleAddTask = () => {
        if (newTaskTitle.trim() === '' || newTaskDescription.trim() === '') {
            toast.error('Görev başlığı ve açıklaması boş olamaz.');
            return;
        }

        const newTaskEntry = {
            id: new Date().getTime(),
            title: newTaskTitle,
            description: newTaskDescription,
            status: newTaskStatus,
        };

        addTask(newTaskEntry);
        setNewTaskTitle('');
        setNewTaskDescription('');
        setNewTaskStatus('todo');
        toast.success('Görev başarıyla eklendi!');
    };

    const handleEditTask = (task) => {
        setEditTaskId(task.id);
        setEditTaskTitle(task.title);
        setEditTaskDescription(task.description);
        setEditTaskStatus(task.status);
        setOpen(true);
    };

    const handleUpdateTask = () => {
        if (editTaskTitle.trim() === '' || editTaskDescription.trim() === '') {
            toast.error('Görev başlığı ve açıklaması boş olamaz.');
            return;
        }

        updateTask({ id: editTaskId, title: editTaskTitle, description: editTaskDescription, status: editTaskStatus });
        setEditTaskId(null);
        setEditTaskTitle('');
        setEditTaskDescription('');
        setEditTaskStatus('');
        setOpen(false);
        toast.success('Görev başarıyla güncellendi!');
    };

    const handleDeleteTask = (id) => {
        removeTask(id);
        toast.success('Görev başarıyla silindi!');
    };

    const handleChangeStatus = (taskId, newStatus) => {
        updateTaskStatus(taskId, newStatus);
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesSearchTerm = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilterStatus = filterStatus === 'all' || task.status === filterStatus;
        return matchesSearchTerm && matchesFilterStatus;
    });

    return (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h5">Görev Yönetimi</Typography>
            <Box sx={{ mt: 2, mb: 2 }}>
                <TextField
                    label="Görev Ara"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mr: 2 }}
                />
                <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    displayEmpty
                    sx={{ mr: 2 }}
                >
                    <MenuItem value="all">Tümü</MenuItem>
                    <MenuItem value="todo">Yapılacak</MenuItem>
                    <MenuItem value="in-progress">Yapılıyor</MenuItem>
                    <MenuItem value="done">Tamamlandı</MenuItem>
                </Select>
                <TextField
                    label="Görev Başlığı"
                    variant="outlined"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    sx={{ mr: 2 }}
                />
                <TextField
                    label="Görev Açıklaması"
                    variant="outlined"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    sx={{ mr: 2 }}
                />
                <Select
                    value={newTaskStatus}
                    onChange={(e) => setNewTaskStatus(e.target.value)}
                    displayEmpty
                    sx={{ mr: 2 }}
                >
                    <MenuItem value="todo">Yapılacak</MenuItem>
                    <MenuItem value="in-progress">Yapılıyor</MenuItem>
                    <MenuItem value="done">Tamamlandı</MenuItem>
                </Select>
                <Button variant="contained" onClick={handleAddTask}>
                    Ekle
                </Button>
            </Box>
            <List sx={{ mt: 2 }}>
                {filteredTasks.map((task) => (
                    <ListItem key={task.id} secondaryAction={
                        <>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditTask(task)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                                <DeleteIcon />
                            </IconButton>
                            <Select
                                value={task.status}
                                onChange={(e) => handleChangeStatus(task.id, e.target.value)}
                                displayEmpty
                                sx={{ ml: 2 }}
                            >
                                <MenuItem value="todo">Yapılacak</MenuItem>
                                <MenuItem value="in-progress">Yapılıyor</MenuItem>
                                <MenuItem value="done">Tamamlandı</MenuItem>
                            </Select>
                        </>
                    }>
                        <ListItemText
                            primary={task.title}
                            secondary={task.description}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TaskManager;
