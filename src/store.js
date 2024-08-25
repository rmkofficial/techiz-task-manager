import { create } from 'zustand';

const useStore = create((set) => ({
    tasks: [],
    setTasks: (tasks) => set({ tasks }), // localStorage'dan yükleme
    addTask: (task) =>
        set((state) => {
            const updatedTasks = [...state.tasks, task];
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
}));

export default useStore;
