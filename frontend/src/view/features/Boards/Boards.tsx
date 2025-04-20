import { Box, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { BoardsColumn } from './components';
import { BoardsModel } from './model';

type BoardsComponentProps = {
  model: BoardsModel;
};

const BoardsComponent = observer(({ model }: BoardsComponentProps) => {
  return (
    <Box height={'100%'} padding={1} sx={{ pt: 2, pb: 3 }}>
      <Grid height={'100%'}>
        <BoardsColumn
          items={model.boards}
          onClickCard={(boardId: number) => model.navigateBoard(boardId)}
        />
      </Grid>
    </Box>
  );
});

export const Boards = () => {
  const model = new BoardsModel();
  return <BoardsComponent model={model} />;
};
