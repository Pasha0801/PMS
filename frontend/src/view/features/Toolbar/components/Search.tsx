import { Box, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { ToolbarModel } from '../model';

type SearchProps = {
  model: ToolbarModel;
};

export const Search = observer(({ model }: SearchProps) => {
  return (
    <Box display="flex" gap={1} width={'250px'} ml={1}>
      <TextField
        label={model.search.label}
        value={model.search.value}
        onChange={(e) => model.changeSearch(e.target.value)}
        variant="standard"
        fullWidth
      />
    </Box>
  );
});
