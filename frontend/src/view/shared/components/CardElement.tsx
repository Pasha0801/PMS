import { Typography, Card, CardContent } from '@mui/material';

type CardElementProps = {
  task: string;
  button?: boolean;
  onClick?: () => void;
};

export const CardElement = ({ task, button, onClick }: CardElementProps) => {
  return (
    <Card variant="elevation">
      <CardContent
        onClick={onClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 1,
        }}
      >
        <Typography
          variant="h5"
          component="a"
          href="#"
          mt={2}
          sx={{
            textDecoration: 'none',
            color: 'text.primary',
            '&:hover': { color: 'primary.main' },
          }}
        >
          {task}
        </Typography>
        {button ? (
          <Typography
            variant="h5"
            component="a"
            mt={2}
            sx={{
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'primary.main',
              '&:hover': { color: 'secondary.main' },
            }}
          >
            Перейти к доске
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
};
