import { FormControl, FormHelperText, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { TaskDialogModel } from '../model';

type FieldDescriptionProps = {
  model: TaskDialogModel;
}

export const FieldDescription = observer(({ model }: FieldDescriptionProps) => {
  return (
    <FormControl>
      <TextField
        variant='filled'
        multiline
        label={model.form.description.label}
        value={model.form.description.value ?? ''}
        onChange={e => model.change('description', e.target.value)}
      />
      <FormHelperText error={model.form.description.isError}>{model.form.description.errorText || ' '}</FormHelperText>
    </FormControl>
  );
});

