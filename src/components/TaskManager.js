"use client";

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, IconButton, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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
        filterCategory,
        setSearchTerm,
        setFilterStatus,
        setFilterCategory,
        categories
    } = useStore();

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskCategory, setNewTaskCategory] = useState('');
    const [newTaskStatus, setNewTaskStatus] = useState('todo');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskTitle, setEditTaskTitle] = useState('');
    const [editTaskDescription, setEditTaskDescription] = useState('');
    const [editTaskCategory, setEditTaskCategory] = useState('');
    const [editTaskStatus, setEditTaskStatus] = useState('');
    const [open, setOpen] = useState(false);

    useLoadTasks();

    const handleAddTask = () => {
        if (newTaskTitle.trim() === '' || newTaskDescription.trim() === '' || newTaskCategory.trim() === '') {
            toast.error('Görev başlığı, açıklaması ve kategorisi boş olamaz.');
            return;
        }

        const newTaskEntry = {
            id: new Date().getTime(),
            title: newTaskTitle,
            description: newTaskDescription,
            category: newTaskCategory,
            status: newTaskStatus,
        };

        addTask(newTaskEntry);
        setNewTaskTitle('');
        setNewTaskDescription('');
        setNewTaskCategory('');
        setNewTaskStatus('todo');
        toast.success('Görev başarıyla eklendi!');
    };

    const handleEditTask = (task) => {
        setEditTaskId(task.id);
        setEditTaskTitle(task.title);
        setEditTaskDescription(task.description);
        setEditTaskCategory(task.category);
        setEditTaskStatus(task.status);
        setOpen(true);
    };

    const handleUpdateTask = () => {
        if (editTaskTitle.trim() === '' || editTaskDescription.trim() === '' || editTaskCategory.trim() === '') {
            toast.error('Görev başlığı, açıklaması ve kategorisi boş olamaz.');
            return;
        }

        updateTask({ id: editTaskId, title: editTaskTitle, description: editTaskDescription, category: editTaskCategory, status: editTaskStatus });
        setEditTaskId(null);
        setEditTaskTitle('');
        setEditTaskDescription('');
        setEditTaskCategory('');
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
        const matchesFilterCategory = filterCategory === 'all' || task.category === filterCategory;
        return matchesSearchTerm && matchesFilterStatus && matchesFilterCategory;
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
                <Select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    displayEmpty
                    sx={{ mr: 2 }}
                >
                    <MenuItem value="all">Tüm Kategoriler</MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
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
                    label="Kategori"
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                    displayEmpty
                    sx={{ mr: 2 }}
                >
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
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
                            primary={`${task.title} - [${task.category}]`}
                            secondary={task.description}
                        />
                    </ListItem>
                ))}
            </List>

            {/* Düzenleme Modalı */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Görev Düzenle</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Görev başlığını, açıklamasını ve kategorisini düzenleyin.
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
                    <Select
                        value={editTaskCategory}
                        onChange={(e) => setEditTaskCategory(e.target.value)}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
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
