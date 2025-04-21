import { Box, Button, Grid, Paper } from '@mui/material';

import { Task } from '#shared/types';

import { TasksTaskCard } from './TaskCard';

type BoardColumnProps = {
  items: Task[];
  onClickTask: (task: Task) => void;
  onClickBoard: (boardId: number) => void;
  onClickButton: () => void;
};

export const TasksColumn = ({
  items,
  onClickTask,
  onClickButton,
  onClickBoard,
}: BoardColumnProps) => {
  return (
    <Grid height={'100%'}>
      <Paper
        variant="outlined"
        sx={{
          margin: 1,
          borderRadius: 2,
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Box display="flex" flexDirection="column" gap={1} padding={2}>
          {items.map((task, index) => (
            <TasksTaskCard
              key={index}
              task={task}
              onClick={onClickTask}
              onClickBoard={onClickBoard}
            />
          ))}
        </Box>
      </Paper>
      <Box display={'flex'} justifyContent={'right'} padding={1}>
        <Button variant="text" onClick={() => onClickButton()}>
          Создать задачу
        </Button>
      </Box>
    </Grid>
  );
};
