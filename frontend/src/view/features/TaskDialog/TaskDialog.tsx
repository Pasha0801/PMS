import { observer } from 'mobx-react-lite';

import { TaskDialogModel, TaskDialogModelProps } from './model';

export const TaskDialog = observer(function TaskDialog(
  props: TaskDialogModelProps,
) {
  const model = new TaskDialogModel(props);

  return (
    <div
      style={{
        backgroundColor: 'turquoise',
        padding: '20px',
        borderRadius: '20px',
      }}
    >
      <h2>{model.title}</h2>
      <button onClick={() => model.close()}>закрыть</button>
    </div>
  );
});
