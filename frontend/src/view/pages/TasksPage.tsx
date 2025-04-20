import { observer } from 'mobx-react-lite';

import { Tasks, Header } from '#view/features';
import { Layout } from '#view/shared/components';

export const TasksPage = observer(function TasksPage() {
  return (
    <Layout header={<Header />}>
      <Tasks />
    </Layout>
  );
});
