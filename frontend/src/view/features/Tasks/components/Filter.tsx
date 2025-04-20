import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { observer } from 'mobx-react-lite';

import { TasksModel } from '../model';

type FilterProps = {
  model: TasksModel;
};

export const Filter = observer(({ model }: FilterProps) => {
  return (
    <Box display="flex" gap={1} width={'500px'}>
      <FormControl
        variant="filled"
        disabled={model.filter.board.isLoading}
        fullWidth
      >
        <InputLabel id="board">
          {model.filter.board.label}
          {model.filter.board.isLoading && (
            <IconButton loading sx={{ ml: 2 }} />
          )}
        </InputLabel>
        <Select value={model.filter.board.value?.id ?? ''} labelId="board">
          {model.filter.board.options.map((board) => (
            <MenuItem
              key={board ? board.id : 'board_none'}
              value={board?.id}
              onClick={() => model.changeFilter('board', board)}
            >
              {board?.name ?? '-'}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error={model.filter.board.isError}>
          {model.filter.board.errorText || ' '}
        </FormHelperText>
      </FormControl>

      <FormControl variant="filled" fullWidth>
        <InputLabel id="status">{model.filter.status.label}</InputLabel>
        <Select value={model.filter.status.value ?? ''} labelId="status">
          {model.filter.status.options.map((status) => (
            <MenuItem
              key={status ? status : 'status_none'}
              value={status ?? ''}
              onClick={() => model.changeFilter('status', status)}
            >
              {status ?? '-'}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
});
