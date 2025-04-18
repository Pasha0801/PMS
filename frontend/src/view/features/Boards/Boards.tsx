import { observer } from 'mobx-react-lite';

import { Box, Grid } from '@mui/material';

import { ColumnItem } from '#view/shared/components';

const initialTasks = {
  projects: [
    'Купить молоко',
    'Сделать зарядку',
    'Купить молоко',
    'Сделать зарядку',
    'Купить молоко',
  ],
};

export const Boards = observer(function BoardsPage() {
  return (
    <Box height={'100%'} padding={1} sx={{ pt: 2, pb: 3 }}>
      <Grid height={'100%'}>
        <ColumnItem items={initialTasks.projects} buttonCard={true} />
      </Grid>
    </Box>
  );
});
