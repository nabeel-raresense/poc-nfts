import React from 'react';
// import { Box, Text, Button } from '@blockstack/ui';
import { authenticate } from '../utils/auth';

export const SignIn = () => {
  return (
    // <Box width="100%" textAlign="center">
    //   <Box maxWidth="800px" mx="auto" mt={[6, '100px']}>
    //     <Text
    //       fontWeight="700"
    //       fontSize={['36px', '50px']}
    //       lineHeight={1}
    //       display="block"
    //     >
    //       Todos secured by Stacks
    //     </Text>
    //     <Box mt={[5, '60px']}>
    <button onClick={() => authenticate()}>Connect Stacks</button>
    //     </Box>
    //   </Box>
    // </Box>
  );
};
