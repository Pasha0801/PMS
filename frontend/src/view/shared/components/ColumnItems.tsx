import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { CardElement } from './CardElement';

type ColumnItemProps<T> = {
  items: T[];
  buttonColumn?: boolean;
  buttonCard?: boolean;
  onClick?: () => void;
  title?: string;
};

export const ColumnItem = ({
  items,
  buttonColumn,
  buttonCard,
  onClick,
  title,
}: ColumnItemProps<string>) => {
  return (
    <Grid flexGrow={1} height={buttonColumn ? 'calc(100% - 70px)' : '100%'}>
      <Paper
        variant="outlined"
        sx={{
          padding: 1,
          margin: 1,
          borderRadius: 2,
          height: '100%',
          overflow: 'auto',
        }}
      >
        {title ? (
          <Typography
            padding={'8px 16px'}
            position={'sticky'}
            top={0}
            variant="h6"
            align="left"
            sx={{
              paddingBottom: 1,
              borderBottom: '2px solid #ccc',
              bgcolor: 'background.paper',
            }}
          >
            {title}
          </Typography>
        ) : null}
        <Box display="flex" flexDirection="column" gap={1} padding={1}>
          {items.map((task, index) => (
            <CardElement
              key={index}
              task={task}
              button={buttonCard}
              onClick={onClick}
            />
          ))}
        </Box>
      </Paper>
      {buttonColumn ? (
        <Box display={'flex'} justifyContent={'right'} margin={1} padding={1}>
          <Button variant="contained" sx={{ mr: 1, textTransform: 'none' }}>
            <Typography variant="h5">Создать задачу</Typography>
          </Button>
        </Box>
      ) : null}
    </Grid>
  );
};
