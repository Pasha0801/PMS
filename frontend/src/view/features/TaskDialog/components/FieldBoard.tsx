import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
} from '@mui/material';
import { observer } from 'mobx-react-lite';

import { TaskDialogModel } from '../model';

type FieldBoardProps = {
  model: TaskDialogModel;
};

export const FieldBoard = observer(({ model }: FieldBoardProps) => {
  return (
    <FormControl
      variant="filled"
      disabled={model.form.board.isLoading || model.form.board.isDisabled}
    >
      <InputLabel id="board">
        {model.form.board.label}
        {model.form.board.isLoading && <IconButton loading sx={{ ml: 2 }} />}
      </InputLabel>
      <Select value={model.form.board.value?.id ?? ''} labelId="board">
        {model.form.board.options.map((board) => (
          <MenuItem
            key={board.id}
            value={board.id}
            onClick={() => model.change('board', board)}
          >
            {board.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={model.form.board.isError}>
        {model.form.board.errorText || ' '}
      </FormHelperText>
    </FormControl>
  );
});
