import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { observer } from 'mobx-react-lite';

import { TaskDialogModel } from '../model';

type FieldStatusProps = {
  model: TaskDialogModel;
};

export const FieldStatus = observer(({ model }: FieldStatusProps) => {
  return (
    <FormControl variant="filled" disabled={model.form.status.isDisabled}>
      <InputLabel id="status">{model.form.status.label}</InputLabel>
      <Select value={model.form.status.value ?? ''} labelId="status">
        {model.form.status.options.map((status) => (
          <MenuItem
            key={status}
            value={status}
            onClick={() => model.change('status', status)}
          >
            {status}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={model.form.status.isError}>
        {model.form.status.errorText || ' '}
      </FormHelperText>
    </FormControl>
  );
});
