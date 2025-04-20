import { Typography, Card, CardContent } from '@mui/material';

import { Task } from '#shared/types';

type TasksTaskCardProps = {
  task: Task;
  onClick: (task: Task) => void;
};

export const TasksTaskCard = ({ task, onClick }: TasksTaskCardProps) => {
  return (
    <Card
      variant="elevation"
      sx={{
        transition: 'all 0.1s ease',
        '&:hover': {
          transform: 'scale(1.0007)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 1,
        },
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
        <Typography
          variant="body2"
          sx={{
            textDecoration: 'none',
          }}
        >
          Доска: {task.boardName}
        </Typography>
      </CardContent>
    </Card>
  );
};
