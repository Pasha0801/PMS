import { Container, Box } from '@mui/material';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  header?: ReactNode;
};

export function Layout({ children, header }: LayoutProps) {
  return (
    <Box>
      {header}
      <Container
        maxWidth={'xl'}
        sx={{
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
