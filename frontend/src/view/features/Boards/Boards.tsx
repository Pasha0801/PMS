import { observer } from 'mobx-react-lite';

import { Box, Grid } from '@mui/material';

import { ColumnItem } from '#view/shared/components';

import { BoardsModel } from './model';

type BoardsComponentProps = {
  model: BoardsModel;
};

const BoardsComponent = observer(({ model }: BoardsComponentProps) => {
  return (
    <Box height={'100%'} padding={1} sx={{ pt: 2, pb: 3 }}>
      <Grid height={'100%'}>
        <ColumnItem
          items={model.boards}
          buttonCard={true}
          onClickCard={(boardId: string) => model.navigateBoard(boardId)}
        />
      </Grid>
    </Box>
  );
});

export const Boards = () => {
  const model = new BoardsModel();
  return <BoardsComponent model={model} />;
};
