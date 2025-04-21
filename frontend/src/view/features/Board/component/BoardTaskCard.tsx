import { Typography, Card, CardContent, Box } from '@mui/material';
import { useDrag } from 'react-dnd';

import { Task } from '#shared/types';

type TaskCardToBoardProps = {
  task: Task;
  onClick: (task: Task) => void;
  sourceColumn: 'taskToDo' | 'taskInProgress' | 'taskDone';
  index: number;
};

export const BoardTaskCard = ({
  task,
  onClick,
  sourceColumn,
  index,
}: TaskCardToBoardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id, sourceColumn, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      variant="elevation"
      sx={{
        transition: 'all 0.1s ease',
        zIndex: isDragging ? 1000 : 1,
        border: isDragging ? '3px solid #ccc' : 'none',
        '&:hover': {
          transform: isDragging ? null : 'scale(1.007)',
          zIndex: isDragging ? 1000 : 2,
        },
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <CardContent
        onClick={() => onClick(task)}
        sx={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          padding: 1,
          gap: 1,
        }}
      >
        <Typography
          variant="body1"
          fontWeight={'bold'}
          sx={{
            textDecoration: 'none',
          }}
        >
          {task.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textDecoration: 'none',
            color: 'text.secondary',
          }}
        >
          {task.description}
        </Typography>
        <Box>
          <Typography
            variant="body2"
            sx={{
              textDecoration: 'none',
            }}
          >
            {task.assignee.fullName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
