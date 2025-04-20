import {
  AppBar,
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  Toolbar,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { HeaderModel } from './model';
import { HeaderLink } from './types';

type HeaderComponentProps = {
  model: HeaderModel;
};

const HeaderComponent = observer(({ model }: HeaderComponentProps) => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth={'xl'}>
        <Toolbar>
          <Tabs value={model.props.activeLink}>
            <Tab
              label="Все задачи"
              value={HeaderLink.TASKS}
              onClick={model.navigateTasksPage}
            />
            <Tab
              label="Доски"
              value={HeaderLink.BOARD}
              onClick={model.navigateBoardsPage}
            />
          </Tabs>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={model.props.onClickCreateTask} variant="text">
            Создать задачу
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export type HeaderProps = {
  activeLink: HeaderLink;
  onClickCreateTask?: VoidFunction;
};

export const Header = React.memo((props: HeaderProps) => {
  const model = new HeaderModel(props);
  return <HeaderComponent model={model} />;
});
