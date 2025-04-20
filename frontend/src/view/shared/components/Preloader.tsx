import { CircularProgress, Box } from '@mui/material';

export const Preloader = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100%'}
    >
      <CircularProgress size={40} />
    </Box>
  );
};
