import { Box, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { Task } from '#shared/types';

import { TasksColumn } from './components';
import { TasksModel } from './model';

type TasksComponentProps = {
  model: TasksModel;
  toolbarHeight: string;
};

const TasksComponent = observer(
  ({ model, toolbarHeight }: TasksComponentProps) => {
    return (
      <Box
        height={`calc(100% - 90px - ${toolbarHeight})`}
        display={'flex'}
        flexDirection={'column'}
        sx={{ padding: 1 }}
      >
        <Grid height={`100%`}>
          <TasksColumn
            items={model.tasks}
            onClickTask={model.editTask}
            onClickButton={model.createNewTask}
          />
        </Grid>
      </Box>
    );
  },
);

export type TasksProps = {
  tasks: Task[];
  getTasks: VoidFunction;
  toolbarHeight: string;
};

export const Tasks = React.memo((props: TasksProps) => {
  const model = new TasksModel(props);
  return <TasksComponent model={model} toolbarHeight={props.toolbarHeight} />;
});
