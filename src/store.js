import { create } from 'zustand';
import { useEffect } from 'react';

const useStore = create((set) => ({
    tasks: [],
    searchTerm: '',
    filterStatus: 'all',
    filterCategory: 'all',
    categories: ['İş', 'Kişisel', 'Eğitim', 'Acil'],


    newTaskTitle: '',
    newTaskDescription: '',
    newTaskCategory: '',
    newTaskStatus: 'todo',
    editTaskId: null,
    editTaskTitle: '',
    editTaskDescription: '',
    editTaskCategory: '',
    editTaskStatus: '',

    fetchTasks: () => {
        if (typeof window !== 'undefined') {
            const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            set({ tasks: storedTasks });
        }
    },

    addTask: (task) =>
        set((state) => {
            const updatedTasks = [...state.tasks, task];
            if (typeof window !== 'undefined') {
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            }
            return { tasks: updatedTasks };
        }),

    updateTask: (updatedTask) =>
        set((state) => {
            const updatedTasks = state.tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            );
            if (typeof window !== 'undefined') {
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            }
            return { tasks: updatedTasks };
        }),

    removeTask: (taskId) =>
        set((state) => {
            const updatedTasks = state.tasks.filter((task) => task.id !== taskId);
            if (typeof window !== 'undefined') {
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            }
            return { tasks: updatedTasks };
        }),

    updateTaskStatus: (taskId, newStatus) =>
        set((state) => {
            const updatedTasks = state.tasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            );
            if (typeof window !== 'undefined') {
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            }
            return { tasks: updatedTasks };
        }),

    setSearchTerm: (term) => set({ searchTerm: term }),
    setFilterStatus: (status) => set({ filterStatus: status }),
    setFilterCategory: (category) => set({ filterCategory: category }),

    setNewTaskDetails: (field, value) => set((state) => ({ [field]: value })),
    setEditTaskDetails: (task) =>
        set({
            editTaskId: task.id,
            editTaskTitle: task.title,
            editTaskDescription: task.description,
            editTaskCategory: task.category,
            editTaskStatus: task.status,
        }),
    resetEditTaskDetails: () =>
        set({
            editTaskId: null,
            editTaskTitle: '',
            editTaskDescription: '',
            editTaskCategory: '',
            editTaskStatus: '',
        }),
}));

export default useStore;

export const useLoadTasks = () => {
    const fetchTasks = useStore((state) => state.fetchTasks);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);
};
