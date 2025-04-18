import { observer } from 'mobx-react-lite';

import { Layout } from '#view/shared/components';
import { Tasks, Header, TasksSearchFilterBar } from '#view/features';

export const TasksPage = observer(function TasksPage() {
  return (
    <Layout header={<Header />}>
      <Tasks>
        <TasksSearchFilterBar onClickButton={() => {}} />
      </Tasks>
    </Layout>
  );
});
