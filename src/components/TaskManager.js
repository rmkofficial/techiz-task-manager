"use client";

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import useStore, { useLoadTasks } from '../store';

const TaskManager = () => {
    const { tasks, addTask, removeTask, updateTask } = useStore();
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskTitle, setEditTaskTitle] = useState('');
    const [editTaskDescription, setEditTaskDescription] = useState('');
    const [open, setOpen] = useState(false);

    // Görevleri sadece istemci tarafında yükleyin
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
        };

        addTask(newTaskEntry);
        setNewTaskTitle('');
        setNewTaskDescription('');
        toast.success('Görev başarıyla eklendi!');
    };

    const handleEditTask = (task) => {
        setEditTaskId(task.id);
        setEditTaskTitle(task.title);
        setEditTaskDescription(task.description);
        setOpen(true);
    };

    const handleUpdateTask = () => {
        if (editTaskTitle.trim() === '' || editTaskDescription.trim() === '') {
            toast.error('Görev başlığı ve açıklaması boş olamaz.');
            return;
        }

        updateTask({ id: editTaskId, title: editTaskTitle, description: editTaskDescription });
        setEditTaskId(null);
        setEditTaskTitle('');
        setEditTaskDescription('');
        setOpen(false);
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
                <Button variant="contained" onClick={handleAddTask}>
                    Ekle
                </Button>
            </Box>
            <List sx={{ mt: 2 }}>
                {tasks.map((task) => (
                    <ListItem key={task.id} secondaryAction={
                        <>
                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditTask(task)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    }>
                        <ListItemText
                            primary={task.title}
                            secondary={task.description}
                        />
                    </ListItem>
                ))}
            </List>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Görev Düzenle</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Görev başlığını ve açıklamasını düzenleyin.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Görev Başlığı"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={editTaskTitle}
                        onChange={(e) => setEditTaskTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Görev Açıklaması"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={editTaskDescription}
                        onChange={(e) => setEditTaskDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>İptal</Button>
                    <Button onClick={handleUpdateTask}>Kaydet</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TaskManager;
