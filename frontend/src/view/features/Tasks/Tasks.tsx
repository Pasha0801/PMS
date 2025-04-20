import { Box, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { Filter, Search, TasksColumn } from './components';
import {
  TASKS_COLUMN_HEIGHT,
  TASKS_FILTER_SEARCH_BOX_HEIGHT,
} from './constants';
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
        height={TASKS_FILTER_SEARCH_BOX_HEIGHT}
      >
        <Search model={model} />
        <Filter model={model} />
      </Box>
      <Grid height={TASKS_COLUMN_HEIGHT}>
        <TasksColumn
          items={model.tasks}
          onClickTask={model.editTask}
          onClickButton={model.createNewTask}
        />
      </Grid>
    </Box>
  );
});

export const Tasks = () => {
  const model = new TasksModel();
  return <TasksComponent model={model} />;
};
