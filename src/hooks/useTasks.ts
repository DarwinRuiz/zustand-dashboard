import { useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";

interface Options {
    value: TaskStatus;
}

export const useTasks = ({ value }: Options) => {

    const isDragging = useTaskStore(state => !!state.draggingTaskId);
    const onTaskDrop = useTaskStore(state => state.onTaskDrop);
    const addTask = useTaskStore(state => state.addTask);

    const [onDragOver, setOnDragOver] = useState<boolean>(false);


    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragOver(true);
    }

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setOnDragOver(false);
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        onTaskDrop(value);
        setOnDragOver(false);
    }


    const handleAddTask = async () => {
        const resp = await Swal.fire({
            title: 'New Task',
            input: 'text',
            inputLabel: 'Nombre de la tarea',
            inputPlaceholder: 'Escribe el nombre de la tarea',
            showCancelButton: true,
            confirmButtonColor: '#4caf50',
            cancelButtonColor: '#f44336',
            inputValidator: (value) => {
                if (!value)
                    return 'Debes escribir el nombre de la tarea'

            }
        })

        if (resp.isDismissed) return;

        addTask(resp.value, value);
    }
    return {
        isDragging,
        onDragOver,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleAddTask
    }
}
