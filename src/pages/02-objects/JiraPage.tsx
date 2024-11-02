import { useShallow } from 'zustand/shallow';
import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores';

export const JiraPage = () => {


  const tasksOpen = useTaskStore(useShallow(state => state.getTaskByStatus('OPEN')));
  const tasksInProgress = useTaskStore(useShallow(state => state.getTaskByStatus('IN_PROGRESS')));
  const tasksDone = useTaskStore(useShallow(state => state.getTaskByStatus('DONE')));

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <JiraTasks title='Pendientes' value='OPEN' tasks={tasksOpen} />

        <JiraTasks title='En progreso' value='IN_PROGRESS' tasks={tasksInProgress} />

        <JiraTasks title='Terminadas' value='DONE' tasks={tasksDone} />

      </div>





    </>
  );
};