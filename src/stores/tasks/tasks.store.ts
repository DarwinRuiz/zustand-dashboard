import { create, StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { Task, TaskStatus } from '../../interfaces';
import { devtools, persist } from 'zustand/middleware';
// import { produce } from 'immer';
import { immer } from 'zustand/middleware/immer';


interface TaskState {
    draggingTaskId?: string;
    tasks: Record<string, Task>;
    getTaskByStatus: (status: TaskStatus) => Task[];
    setDraggingTaskId: (taskId: string) => void;
    removeDraggingTaskId: () => void;
    changeTaskStatus: (taskId: string, status: TaskStatus) => void;
    onTaskDrop: (status: TaskStatus) => void;
    addTask: (title: string, status: TaskStatus) => void;
}

const storeAPI: StateCreator<TaskState, [["zustand/immer", never]]> = (set, get) => ({
    tasks: {
        '1': {
            id: '1',
            title: 'Task 1',
            status: 'OPEN',
        },
        '2': {
            id: '2',
            title: 'Task 2',
            status: 'IN_PROGRESS',
        },
        '3': {
            id: '3',
            title: 'Task 3',
            status: 'OPEN',
        },
        '4': {
            id: '4',
            title: 'Task 4',
            status: 'OPEN',
        },
    },
    getTaskByStatus: (status: TaskStatus) => {
        return Object.values(get().tasks).filter(task => task.status === status);
    },
    setDraggingTaskId: (taskId: string) => {
        set({ draggingTaskId: taskId });
    },
    removeDraggingTaskId: () => {
        set({ draggingTaskId: undefined });
    },
    changeTaskStatus: (taskId: string, status: TaskStatus) => {

        set(state => {
            state.tasks[taskId] = {
                ...state.tasks[taskId],
                status,
            }
        });
    },
    onTaskDrop: (status: TaskStatus) => {
        const taskId = get().draggingTaskId;
        if (!taskId) return;

        get().changeTaskStatus(taskId, status);
        get().removeDraggingTaskId();
    },
    addTask: (title: string, status: TaskStatus) => {
        const newTask: Task = {
            id: uuidv4(),
            title,
            status,
        };


        set(state => {
            state.tasks[newTask.id] = newTask;
        })

        //traditional way to update state using javascript
        // set((state) => ({
        //     tasks: {
        //         ...state.tasks,
        //         [newTask.id]: newTask,
        //     },
        // }));

        //require install immer package [npm install immer]
        // set(produce((state: TaskState) => {
        //     state.tasks[newTask.id] = newTask;
        // }));
    },
});


export const useTaskStore = create<TaskState>()(devtools(persist(immer(storeAPI), { name: 'tasks-store' })));