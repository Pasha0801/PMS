import { Box, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { BoardModel } from '#view/features/';

import { BoardColumn } from './component';
import { BOARD_TITLE_COLUMN } from './constants';

type BoardComponentProps = {
  model: BoardModel;
};

const BoardComponent = observer(({ model }: BoardComponentProps) => {
  return (
    <Box height={'100%'} sx={{ padding: 2 }}>
      <Grid container spacing={2} height={'100%'}>
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
