import { observer } from 'mobx-react-lite';

import './App.css';
import { appModel } from './model';

export const App = observer(function App() {
  const { dialog, router } = appModel;

  return (
    <>
      {router.Component}
      {dialog.Component}
    </>
  );
});
