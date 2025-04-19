import { FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { TaskDialogModel } from '../model';

type FieldAssigneeProps = {
  model: TaskDialogModel;
}

export const FieldAssignee = observer(({ model }: FieldAssigneeProps) => {
  return (
    <FormControl variant='filled' disabled={model.form.assignee.isLoading}>
      <InputLabel id="assignee">
        {model.form.assignee.label}
        {model.form.assignee.isLoading && <IconButton loading sx={{ml: 2}}/>}
      </InputLabel>
      <Select
        value={model.form.assignee.value?.id ?? ''}
        labelId="assignee"
      >
        {model.form.assignee.options.map(assignee => (
          <MenuItem key={assignee.id} value={assignee.id} onClick={() => model.change('assignee', assignee)}>{assignee.fullName}</MenuItem>
        ))}
      </Select>
      <FormHelperText error={model.form.assignee.isError}>{model.form.assignee.errorText || ' '}</FormHelperText>
    </FormControl>
  );
});

