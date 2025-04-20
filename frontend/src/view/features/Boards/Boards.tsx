import { Box, Grid } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { Board } from '#shared/types';

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

export type BoardsProps = {
  boards: Board[];
};

export const Boards = React.memo((props: BoardsProps) => {
  const model = new BoardsModel(props);
  return <BoardsComponent model={model} />;
});
