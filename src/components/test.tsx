import React, { useEffect, useState } from 'react';
import { Check, Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTasks, setEditingTasks] = useState<{ [id: number]: string }>(
    {},
  );

  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));

  const handleDelete = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleChange = (id: number, newName: string) => {
    setEditingTasks((prev) => ({
      ...prev,
      [id]: newName,
    }));
  };

  const handleSave = async (id: number) => {
    if (editingTasks[id]) {
      await api.patch(`/tasks/${id}`, { name: editingTasks[id] });
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, name: editingTasks[id] } : task,
        ),
      );
      setEditingTasks((prev) => {
        const newEditingTasks = { ...prev };
        delete newEditingTasks[id];
        return newEditingTasks;
      });
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
              onChange={(e) => handleChange(task.id, e.target.value)}
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
