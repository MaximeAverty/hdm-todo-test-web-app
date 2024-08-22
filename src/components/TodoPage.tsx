/**
 * @todo YOU HAVE TO IMPLEMENT THE DELETE AND SAVE TASK ENDPOINT, A TASK CANNOT BE UPDATED IF THE TASK NAME DID NOT CHANGE, YOU'VE TO CONTROL THE BUTTON STATE ACCORDINGLY
 */
import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';
import TaskCard from './TaskCard.tsx';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTasks, setEditingTasks] = useState<{ [id: number]: string }>(
    {},
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [addTaskInput, setAddTaskInput] = useState<string>('');

  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));

  const handleDelete = async (id: number) => {
    // @todo IMPLEMENT HERE : DELETE THE TASK & REFRESH ALL THE TASKS, DON'T FORGET TO ATTACH THE FUNCTION TO THE APPROPRIATE BUTTON
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: number, content: string) => {
    setEditingTasks((prev) => ({
      ...prev,
      [id]: content,
    }));
  };

  const handleSave = async (id: number) => {
    // @todo IMPLEMENT HERE : SAVE THE TASK & REFRESH ALL THE TASKS, DON'T FORGET TO ATTACH THE FUNCTION TO THE APPROPRIATE BUTTON
    if (editingTasks[id]) {
      await api.patch(`/tasks/${id}`, { name: editingTasks[id] });
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, name: editingTasks[id] } : task,
        ),
      );
    }
  };

  const handleAddTask = async () => {
    if (addTaskInput?.length) {
      const newTask = await api.post('/tasks', { name: addTaskInput });
      setTasks((prev) => [...prev, newTask]);
      setAddTaskInput('');
    }
  };

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDelete}
            handleSave={handleSave}
            editingTasks={editingTasks}
          />
        ))}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Button
            variant="outlined"
            onClick={() => {
              setShowModal((prev) => !prev);
            }}
          >
            Ajouter une tâche
          </Button>
        </Box>
      </Box>

      {showModal && (
        <Card sx={{ maxWidth: 400, mx: 'auto', my: 2, p: 2 }}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Ajouter une tâche
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Nom de la tâche"
                variant="outlined"
                value={addTaskInput}
                fullWidth
                onChange={(e) => setAddTaskInput(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                endIcon={<Add />}
                onClick={handleAddTask}
              >
                Créer
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default TodoPage;
