import { Box, Paper, Grid } from '@mui/material';

import { Board } from '#shared/types';

import { BoardsCard } from './BoardsCard';

type BoardsColumnProps = {
  items: Board[];
  onClickCard: (item: number) => void;
};

export const BoardsColumn = ({ items, onClickCard }: BoardsColumnProps) => {
  return (
    <Grid height={'100%'}>
      <Paper
        variant="outlined"
        sx={{
          padding: 1,
          margin: 1,
          borderRadius: 2,
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Box display="flex" flexDirection="column" gap={1} padding={1}>
          {items.map((board, index) => {
            return (
              <BoardsCard
                key={index}
                board={board}
                onClick={() => onClickCard(board.id)}
              />
            );
          })}
        </Box>
      </Paper>
    </Grid>
  );
};
