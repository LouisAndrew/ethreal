import React from 'react';

import Img, { FluidObject } from 'gatsby-image';
import { Flex, Box, Heading, Text } from 'rebass';

import { Blog as BlogSchema } from 'helper/schema';
import { useAllBlogs } from 'helper/use-all-blogs';
import { getDateReadable } from 'helper/get-date';

type Props = {
    blog: BlogSchema;
};

const Blog: React.FC<Props> = ({ blog }) => {
    const { getQueryImgs } = useAllBlogs();

    const imgs = getQueryImgs(blog); // returns fluid images in sources.

    // extract just the necessary attrs.
    const { content, date, title } = blog;

    // set max widths to prevent the blog being too stretched
    const maxWidths = ['90%', '80%', '80%', '80%', 1200];

    return (
        <Flex
            className="top"
            alignItems="center"
            justifyContent="center"
            pb={[6]}
        >
            <Flex
                className="blog"
                as="article"
                width="100%"
                maxWidth={maxWidths}
                flexDirection="column"
                alignItems="center"
            >
                <Box
                    width="100%"
                    maxWidth={[400, 400, 700, 1200]} // taken from queryimgs breakpoints.
                    as="header"
                    mb={[3, 3, 4, 6]}
                >
                    {imgs && (
                        <Img
                            fluid={
                                imgs.childImageSharp.fluid as
                                    | FluidObject
                                    | FluidObject[]
                            }
                            alt={`${title} cover image`}
                        />
                    )}
                    <Flex
                        my={[6]}
                        alignItems="center"
                        justifyContent="space-between"
                        flexWrap="wrap"
                    >
                        <Heading as="h1" variant="blogTitle">
                            {title}
                        </Heading>
                        <Text as="h4" variant="blogDate">
                            {getDateReadable(date)}
                        </Text>
                    </Flex>
                </Box>

                <Box
                    id="blog-content"
                    sx={{
                        fontFamily: 'body',
                        lineHeight: ['6px', '6px', '7px'],
                    }}
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </Flex>
        </Flex>
    );
};

export { Blog };
