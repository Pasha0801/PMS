import { Box, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

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
    <Error onClick={model.navigateTasksPage} />;
  }

  return (
    <Box height={'100%'} sx={{ padding: 2 }}>
      <Typography variant="h6" ml={2} height={BOARD_TITLE_HEIGHT}>
        {model.titleBoard}
      </Typography>
      <Grid container spacing={2} height={BOARD_COLUMN_HEIGHT}>
        <BoardColumn
          items={model.taskToDo}
          title={BOARD_TITLE_COLUMN.todo}
          onClickTask={model.editTask}
        />
        <BoardColumn
          items={model.taskInProgress}
          title={BOARD_TITLE_COLUMN.inProgress}
          onClickTask={model.editTask}
        />
        <BoardColumn
          items={model.taskDone}
          title={BOARD_TITLE_COLUMN.done}
          onClickTask={model.editTask}
        />
      </Grid>
    </Box>
  );
});

export const Board = () => {
  const model = new BoardModel();

  return <BoardComponent model={model} />;
};
