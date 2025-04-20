import { Box, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { ColumnItem } from '#view/shared/components';

import { Filter, Search } from './components';
import { TasksModel } from './model';

type TasksComponentProps = {
  model: TasksModel;
};

const TasksComponent = observer(({ model }: TasksComponentProps) => {
  return (
    <Box
      height={'100%'}
      display={'flex'}
      flexDirection={'column'}
      sx={{ padding: 1 }}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        m={1}
        height={'60px'}
      >
        <Search model={model} />
        <Filter model={model} />
      </Box>
      <Grid height={'calc(100% - 80px)'}>
        <ColumnItem
          items={model.tasks}
          buttonColumn={true}
          onClickButtonColumn={() => model.createNewTask()}
          onClickCard={(task) => model.editTask(task)}
        />
      </Grid>
    </Box>
  );
});

export const Tasks = () => {
  const model = new TasksModel();
  return <TasksComponent model={model} />;
};
