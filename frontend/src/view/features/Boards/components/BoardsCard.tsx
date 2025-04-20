import { Typography, Card, CardContent, Box } from '@mui/material';

import { Board } from '#shared/types';

type CardElementProps = {
  board: Board;
  onClick: () => void;
};

export const BoardsCard = ({ board, onClick }: CardElementProps) => {
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
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography
            onClick={onClick}
            variant="body1"
            sx={{
              cursor: 'pointer',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            {board.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textDecoration: 'none',
              color: 'text.secondary',
            }}
          >
            {board.description}
          </Typography>
        </Box>

        <Typography
          onClick={onClick}
          variant="body1"
          sx={{
            cursor: 'pointer',
            textDecoration: 'none',
            color: 'primary.main',
            '&:hover': { color: 'primary.light' },
          }}
        >
          Перейти к доске
        </Typography>
      </CardContent>
    </Card>
  );
};
