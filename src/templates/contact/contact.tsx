import React from 'react';

import { Flex, Box, Heading } from 'rebass';

import Form from './form';
import Stockist from './stockist';

type Props = {};

const Contact: React.FC<Props> = () => {
    const heading1 = 'GOT A QUESTION OR NEED SOME HELP?';
    const heading2 = 'SEND US AN EMAIL AND WE’LL HELP YOU OUT! ';

    return (
        <Box
            className="content"
            sx={{ textAlign: 'center' }}
            px={[5]}
            width={['100%', '100%', '80%', '60%']}
            m="0 auto"
        >
            <Heading as="h1" variant="h4" py={[4]}>
                {heading1}
                <br />
                {heading2}
            </Heading>
            <Flex flexDirection={['column', 'column', 'row']}>
                <Form />
                <Stockist />
            </Flex>
        </Box>
    );
};

export { Contact };
