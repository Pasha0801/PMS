import { Box, Dialog, DialogActions, DialogContent } from '@mui/material';
import { observer } from 'mobx-react-lite';

import {
  ButtonSubmit,
  ButtonToBoard,
  FieldAssignee,
  FieldBoard,
  FieldDescription,
  FieldPriority,
  FieldStatus,
  FieldTitle,
  Title,
} from './components';
import { TaskDialogModel, TaskDialogModelProps } from './model';

type TaskDialogComponentProps = {
  model: TaskDialogModel;
};

const TaskDialogComponent = observer(({ model }: TaskDialogComponentProps) => {
  return (
    <Dialog open={true} onClose={model.close}>
      <Title model={model} />

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={0}>
          <FieldTitle model={model} />
          <FieldDescription model={model} />
          <FieldBoard model={model} />
          <FieldPriority model={model} />
          <FieldStatus model={model} />
          <FieldAssignee model={model} />
        </Box>
      </DialogContent>

      <DialogActions>
        <Box width="100%" display="flex" justifyContent="space-between">
          <ButtonToBoard model={model} />
          <ButtonSubmit model={model} />
        </Box>
      </DialogActions>
    </Dialog>
  );
});

export const TaskDialog = (props: TaskDialogModelProps) => {
  const model = new TaskDialogModel(props);

  return <TaskDialogComponent model={model} />;
};
