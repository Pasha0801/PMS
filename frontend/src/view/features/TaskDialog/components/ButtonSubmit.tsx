import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { observer } from 'mobx-react-lite';

import { TaskDialogModel } from '../model';

type ButtonSubmitProps = {
  model: TaskDialogModel;
};

export const ButtonSubmit = observer(({ model }: ButtonSubmitProps) => {
  return (
    <FormControl variant="filled">
      <Button
        onClick={() => model.controls.buttonSubmit.onClick?.()}
        disabled={
          model.controls.buttonSubmit.isLoading ||
          model.controls.buttonSubmit.isDisabled
        }
      >
        {model.controls.buttonSubmit.text}
        {model.controls.buttonSubmit.isLoading && (
          <CircularProgress size={15} sx={{ ml: 2 }} />
        )}
      </Button>
      <FormHelperText error={model.controls.buttonSubmit.isError}>
        {model.controls.buttonSubmit.errorText || ' '}
      </FormHelperText>
    </FormControl>
  );
});
