import { Check, Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTasks, setEditingTasks] = useState<{ [key: number]: string }>(
    {},
  );

  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));

  const handleDelete = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleSave = async (id: number) => {
    const updatedTask = tasks.find((task) => task.id === id);
    if (updatedTask) {
      await api.put(`/tasks/${id}`, { name: editingTasks[id] });
      setEditingTasks((prev) => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
      handleFetchTasks();
    }
  };

  const handleChange = (id: number, value: string) => {
    setEditingTasks((prev) => ({ ...prev, [id]: value }));
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
              onChange={(e) => handleChange(task.id, e.target.value)}
              fullWidth
              sx={{ maxWidth: 350 }}
            />
            <Box>
              <IconButton
                color="success"
                onClick={() => handleSave(task.id)}
                disabled={
                  !editingTasks[task.id] || editingTasks[task.id] === task.name
                }
              >
                <Check />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Button variant="outlined" onClick={() => {}}>
            Ajouter une tâche
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
