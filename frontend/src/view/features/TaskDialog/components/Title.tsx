import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, IconButton } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { TaskDialogModel } from '../model';


type TitleProps = {
  model: TaskDialogModel;
}

export const Title = observer(({ model }: TitleProps) => {
  return (
    <DialogTitle display='flex' justifyContent='space-between' width='600px'>
      {model.controls.title}
      <IconButton onClick={model.close}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
});
