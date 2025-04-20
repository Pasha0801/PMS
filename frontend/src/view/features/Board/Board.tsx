import { Box, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BoardModel } from '#view/features/';
import { Preloader, Error } from '#view/shared';

import { BoardColumn } from './component';
import {
  BOARD_TITLE_COLUMN,
  BOARD_COLUMN_HEIGHT,
  BOARD_TITLE_HEIGHT,
} from './constants';

type BoardComponentProps = {
  model: BoardModel;
};

const BoardComponent = observer(({ model }: BoardComponentProps) => {
  if (model.isLoading) {
    return <Preloader />;
  }
  if (model.isError) {
    return <Error onClick={model.navigateTasksPage} />;
  }

  const handleDrop = async (
    taskId: number,
    sourceColumn: 'taskToDo' | 'taskInProgress' | 'taskDone',
    destinationColumn: 'taskToDo' | 'taskInProgress' | 'taskDone',
    destinationIndex: number,
  ) => {
    await model.moveTask(
      taskId,
      sourceColumn,
      destinationColumn,
      destinationIndex,
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box height={'100%'} sx={{ padding: 2 }}>
        <Typography variant="h6" ml={2} height={BOARD_TITLE_HEIGHT}>
          {model.titleBoard}
        </Typography>
        <Grid container spacing={2} height={BOARD_COLUMN_HEIGHT}>
          <BoardColumn
            id="todo"
            items={model.taskToDo}
            title={BOARD_TITLE_COLUMN.todo}
            onClickTask={model.editTask}
            onDrop={handleDrop}
            columnType="taskToDo"
          />
          <BoardColumn
            id="inProgress"
            items={model.taskInProgress}
            title={BOARD_TITLE_COLUMN.inProgress}
            onClickTask={model.editTask}
            onDrop={handleDrop}
            columnType="taskInProgress"
          />
          <BoardColumn
            id="done"
            items={model.taskDone}
            title={BOARD_TITLE_COLUMN.done}
            onClickTask={model.editTask}
            onDrop={handleDrop}
            columnType="taskDone"
          />
        </Grid>
      </Box>
    </DndProvider>
  );
});

export const Board = () => {
  const model = new BoardModel();
  return <BoardComponent model={model} />;
};
