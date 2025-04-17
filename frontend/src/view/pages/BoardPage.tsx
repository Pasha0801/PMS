import { observer } from 'mobx-react-lite';

import { appModel } from '#view/app/';
import { TaskDialog } from '#view/features/TaskDialog/TaskDialog';

export const BoardPage = observer(function BoardPage() {
  const handleClick = () => {
    appModel.dialog.open(<TaskDialog text="тестттт" />);
  };
  return (
    <>
      <span>ДОСКА</span>

      <button onClick={handleClick}>открыть модалку</button>
    </>
  );
});
