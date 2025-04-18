import { observer } from 'mobx-react-lite';
import { ReactNode, useState } from 'react';

import { Box, Grid } from '@mui/material';

import { ColumnItem } from '#view/shared/components';

const initialTasks = {
  projects: ['Купить молоко', 'Сделать зарядку', 'Купить молоко'],
};

type TasksProps = {
  children: ReactNode;
};

export const Tasks = observer(function Tasks({ children }: TasksProps) {
  const [tasks] = useState(initialTasks);

  return (
    <Box
      height={'100%'}
      display={'flex'}
      flexDirection={'column'}
      sx={{ padding: 1 }}
    >
      {children}
      <Grid height={'calc(100% - 80px)'}>
        <ColumnItem items={tasks.projects} buttonColumn={true} />
      </Grid>
    </Box>
  );
});
