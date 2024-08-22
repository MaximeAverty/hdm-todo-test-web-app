/**
 * @todo YOU HAVE TO IMPLEMENT THE DELETE AND SAVE TASK ENDPOINT, A TASK CANNOT BE UPDATED IF THE TASK NAME DID NOT CHANGE, YOU'VE TO CONTROL THE BUTTON STATE ACCORDINGLY
 */
import { Add, Check, Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

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
          <Box
            key={task.id}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
            gap={1}
            width="100%"
          >
            <TextField
              size="small"
              value={editingTasks[task.id] ?? task.name}
              fullWidth
              onChange={(e) => handleEditTask(task.id, e.target.value)}
              sx={{ maxWidth: 350 }}
            />
            <Box>
              <IconButton
                color="success"
                disabled={
                  !(
                    editingTasks[task.id] && editingTasks[task.id] !== task.name
                  )
                }
                onClick={() => handleSave(task.id)}
              >
                <Check />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  handleDelete(task.id);
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          </Box>
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
