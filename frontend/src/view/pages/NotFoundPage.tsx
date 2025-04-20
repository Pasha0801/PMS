import { Box, Typography } from '@mui/material';

import { Layout } from '#view/shared/components';

export const NotFoundPage = () => {
  return (
    <Layout>
      <Box
        display={'flex'}
        height={'100vh'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Typography variant="h4">Страница не найдена!</Typography>
      </Box>
    </Layout>
  );
};
