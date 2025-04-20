import { Task } from '#shared/types';
import { Typography, Card, CardContent } from '@mui/material';

type TaskCardToBoardProps = {
  task: Task;
  onClick: (task: Task) => void;
};

export const BoardTaskCard = ({ task, onClick }: TaskCardToBoardProps) => {
  return (
    <Card
      variant="elevation"
      sx={{
        transition: 'all 0.1s ease',
        '&:hover': {
          transform: 'scale(1.01)',
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
          variant="h5"
          fontWeight={'bold'}
          sx={{
            textDecoration: 'none',
            color: 'text.primary',
            '&:hover': { color: 'primary.main' },
          }}
        >
          {task.title}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textDecoration: 'none',
            color: 'text.secondary',
          }}
        >
          {task.description}
        </Typography>
      </CardContent>
    </Card>
  );
};
