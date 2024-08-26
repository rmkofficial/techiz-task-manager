import { create } from 'zustand';
import { useEffect } from 'react';

const useStore = create((set) => ({
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    searchTerm: '', // Arama terimi
    filterStatus: 'all', // Filtre durumu

    fetchTasks: () => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        set({ tasks: storedTasks });
    },

    addTask: (task) =>
        set((state) => {
            const updatedTasks = [...state.tasks, task];
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return { tasks: updatedTasks };
        }),

    removeTask: (taskId) =>
        set((state) => {
            const updatedTasks = state.tasks.filter((task) => task.id !== taskId);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return { tasks: updatedTasks };
        }),

    updateTask: (updatedTask) =>
        set((state) => {
            const updatedTasks = state.tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            );
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return { tasks: updatedTasks };
        }),

    updateTaskStatus: (taskId, newStatus) =>
        set((state) => {
            const updatedTasks = state.tasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            );
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return { tasks: updatedTasks };
        }),

    setSearchTerm: (term) => set({ searchTerm: term }), 
    setFilterStatus: (status) => set({ filterStatus: status }), 
}));

export default useStore;

export const useLoadTasks = () => {
    const fetchTasks = useStore((state) => state.fetchTasks);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            fetchTasks();
        }
    }, [fetchTasks]);
};
