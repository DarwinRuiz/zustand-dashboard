export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export interface Task {
    id: string;
    title: string;
    status: TaskStatus;
}