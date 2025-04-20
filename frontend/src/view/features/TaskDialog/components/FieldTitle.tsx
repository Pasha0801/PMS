import { FormControl, FormHelperText, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { TaskDialogModel } from '../model';

type FieldTitleProps = {
  model: TaskDialogModel;
};

export const FieldTitle = observer(({ model }: FieldTitleProps) => {
  return (
    <FormControl>
      <TextField
        variant="filled"
        label={model.form.title.label}
        value={model.form.title.value ?? ''}
        onChange={(e) => model.change('title', e.target.value)}
      />
      <FormHelperText error={model.form.title.isError}>
        {model.form.title.errorText || ' '}
      </FormHelperText>
    </FormControl>
  );
});
