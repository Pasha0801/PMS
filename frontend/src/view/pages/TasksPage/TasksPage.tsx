import { observer } from 'mobx-react-lite';

import { Tasks, Header, HeaderLink, Toolbar } from '#view/features';
import { Layout, Preloader, Error } from '#view/shared/components';

import { TasksPageModel } from './model';

type TasksPageComponentProps = {
  model: TasksPageModel;
};

const TOOLBAR_HEIGHT = '60px';

const TasksPageComponent = observer(({ model }: TasksPageComponentProps) => {
  if (model.isLoading) {
    return (
      <Layout>
        <Preloader />
      </Layout>
    );
  }

  if (model.isError) {
    return (
      <Layout>
        <Error
          onClick={model.navigateBoardsPage}
          buttonTitle="Перейти ко всем доскам"
        />
      </Layout>
    );
  }

  return (
    <Layout
      header={
        <Header
          activeLink={HeaderLink.TASKS}
          onClickCreateTask={model.createNewTask}
        />
      }
    >
      <Toolbar
        onChange={model.onChangeToolbar}
        toolbarHeight={TOOLBAR_HEIGHT}
      />
      <Tasks
        tasks={model.tasks}
        getTasks={model.getTasks}
        toolbarHeight={TOOLBAR_HEIGHT}
      />
    </Layout>
  );
});

export const TasksPage = () => {
  const model = new TasksPageModel();
  return <TasksPageComponent model={model} />;
};
