import { Box, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { TasksModel } from '../model';

type SearchProps = {
  model: TasksModel;
};

export const Search = observer(({ model }: SearchProps) => {
  return (
    <Box display="flex" gap={1} width={'250px'}>
      <TextField
        label={model.search.label}
        value={model.search.value}
        onChange={(e) => model.changeSearch(e.target.value)}
        variant="filled"
        fullWidth
      />
    </Box>
  );
});
