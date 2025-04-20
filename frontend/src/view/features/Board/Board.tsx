import { observer } from 'mobx-react-lite';
import { ColumnItem } from '#view/shared/components';
import { BoardModel } from '#view/features/';

import { Box, Grid } from '@mui/material';

type BoardComponentProps = {
  model: BoardModel;
};

const BoardComponent = observer(({ model }: BoardComponentProps) => {
  return (
    <Box height={'100%'} sx={{ padding: 2 }}>
      <Grid container spacing={2} height={'100%'}>
        <ColumnItem
          items={model.taskToDo}
          // onClickCard={handleClick}
          title="To Do"
        />
        <ColumnItem
          items={model.taskInProgress}
          // onClickCard={handleClick}
          title="In Progress"
        />
        <ColumnItem
          items={model.taskDone}
          // onClickCard={handleClick}
          title="Done"
        />
      </Grid>
    </Box>
  );
});

export const Board = () => {
  const model = new BoardModel();
  return <BoardComponent model={model} />;
};
