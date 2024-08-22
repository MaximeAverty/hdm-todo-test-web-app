import { Check, Delete } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import { Task } from '../index';

interface TaskCardProps {
  task: Task;
  handleEditTask: (id: number, content: string) => void;
  handleDeleteTask: (id: number) => {};
  editingTasks: { [id: number]: string };
  handleSave: (id: number) => Promise<void>;
}

const TaskCard = ({
  task,
  handleEditTask,
  handleDeleteTask,
  editingTasks,
  handleSave,
}: TaskCardProps) => (
  <Box
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
          !(editingTasks[task.id] && editingTasks[task.id] !== task.name)
        }
        onClick={() => handleSave(task.id)}
      >
        <Check />
      </IconButton>
      <IconButton
        color="error"
        onClick={() => {
          handleDeleteTask(task.id);
        }}
      >
        <Delete />
      </IconButton>
    </Box>
  </Box>
);

export default TaskCard;
