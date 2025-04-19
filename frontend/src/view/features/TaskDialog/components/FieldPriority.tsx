import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { TaskDialogModel } from '../model';

type FieldPriorityProps = {
  model: TaskDialogModel;
}

export const FieldPriority = observer(({ model }: FieldPriorityProps) => {
  return (
    <FormControl variant='filled'>
    <InputLabel id="priority">{model.form.priority.label}</InputLabel>
    <Select
      value={model.form.priority.value ?? ''}
      labelId="priority"
    >
      {model.form.priority.options.map(priority => (
        <MenuItem key={priority} value={priority} onClick={() => model.change('priority', priority)}>{priority}</MenuItem>
      ))}
    </Select>
    <FormHelperText error={model.form.priority.isError}>{model.form.priority.errorText || ' '}</FormHelperText>
  </FormControl>
  );
});

