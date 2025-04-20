import { Box, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Task, Board as BoardType } from '#shared/types';
import { BoardModel } from '#view/features/';

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
          {model.board.name}
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

export type BoardProps = {
  board: BoardType;
  tasks: Task[];
  getBoardTasks: VoidFunction;
};

export const Board = React.memo((props: BoardProps) => {
  const model = new BoardModel(props);
  return <BoardComponent model={model} />;
});
