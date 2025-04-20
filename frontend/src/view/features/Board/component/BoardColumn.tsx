import { Box, Typography, Paper, Grid } from '@mui/material';
import { useDrop } from 'react-dnd';

import { Task } from '#shared/types';

import { BoardTaskCard } from './BoardTaskCard';

type BoardColumnProps = {
  id: string;
  items: Task[];
  title: string;
  onClickTask: (task: Task) => void;
  onDrop: (
    taskId: number,
    sourceColumn: 'taskToDo' | 'taskInProgress' | 'taskDone',
    destinationColumn: 'taskToDo' | 'taskInProgress' | 'taskDone',
    destinationIndex: number,
  ) => void;
  columnType: 'taskToDo' | 'taskInProgress' | 'taskDone';
};

export const BoardColumn = ({
  items,
  title,
  onClickTask,
  onDrop,
  columnType,
}: BoardColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: {
      id: number;
      sourceColumn: 'taskToDo' | 'taskInProgress' | 'taskDone';
      index: number;
    }) => {
      onDrop(item.id, item.sourceColumn, columnType, items.length);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Grid height={'100%'} size={{ xs: 12, md: 4 }}>
      <Paper
        ref={drop as unknown as React.Ref<HTMLDivElement>}
        variant="outlined"
        sx={{
          margin: 1,
          borderRadius: 2,
          height: '100%',
          overflow: 'auto',
          backgroundColor: isOver ? '#DCDCDC' : 'inherit',
        }}
      >
        <Typography
          position={'sticky'}
          top={0}
          padding={2}
          zIndex={10}
          bgcolor="background.paper"
          fontWeight={500}
          align="left"
          sx={{
            paddingBottom: 1,
            borderBottom: '2px solid #ccc',
            backgroundColor: 'background.paper',
          }}
        >
          {title}
        </Typography>
        <Box display="flex" flexDirection="column" gap={1} padding={2}>
          {items.map((task, index) => (
            <BoardTaskCard
              key={task.id}
              task={task}
              onClick={onClickTask}
              sourceColumn={columnType}
              index={index}
            />
          ))}
        </Box>
      </Paper>
    </Grid>
  );
};
