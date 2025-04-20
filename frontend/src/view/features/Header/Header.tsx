import { observer } from 'mobx-react-lite';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';

import { HeaderModel } from './model';

type HeaderComponentProps = {
  model: HeaderModel;
};

const HeaderComponent = observer(({ model }: HeaderComponentProps) => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth={'xl'}>
        <Toolbar sx={{ pl: 2, pr: 2 }} disableGutters>
          <Box sx={{ display: 'flex', gap: 5, ml: 1 }}>
            <Typography
              onClick={() => model.navigateTasksPage()}
              variant="h4"
              component="a"
              href="#"
              sx={{
                textDecoration: 'none',
                color: 'text.primary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Все задачи
            </Typography>
            <Typography
              onClick={() => model.navigateBoardsPage()}
              variant="h4"
              component="a"
              href="#"
              sx={{
                textDecoration: 'none',
                color: 'text.primary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Доски
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            onClick={() => model.createNewTask()}
            variant="contained"
            color="primary"
          >
            <Typography
              variant="h5"
              sx={{
                textTransform: 'none',
              }}
            >
              Создать задачу
            </Typography>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export const Header = () => {
  const model = new HeaderModel();
  return <HeaderComponent model={model} />;
};
