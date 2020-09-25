import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { intersectionBy } from 'lodash';

import { Box, Flex, Text } from 'rebass';

import { Product as ProductSchema } from 'helper/schema/product';
import { addToCart } from 'state/actions/cart';
import useAllProducts from 'helper/use-all-products';
import Breadcrumbs from 'components/breadcrumbs';
import ProductImage, { ImgProps } from './product-image';
import ProductInfo from './product-info';
import RelatedProducts from './related-products';

type Props = ProductSchema;

const Products: React.FC<Props> = product => {
    const {
        name,
        description,
        amount,
        category,
        collection,
        productImages,
        slug,
        urls,
        weight,
        prices,
        productDetails,
        availableSizes,
        gems,
        relatedProducts,
    } = product;

    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();

    const allProducts = useAllProducts();

    const displayText = 'related products';

    const submitToCart = () => {
        dispatch(addToCart(product, qty !== 1 ? qty : undefined));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQty(parseInt(event.target.value, 10));
    };

    return (
        <Box
            px={[6, 6, 8, 9, 11]}
            className="content"
            width="100%"
            mx={['unset', 'unset', 'unset', 'auto']}
        >
            {/* breadcrumbs */}
            <Breadcrumbs location={`shop/${collection}/${name}`} />

            {/* product container */}
            <Flex
                flexDirection={['column', 'row']}
                alignItems={['center', 'flex-start']}
            >
                {/* product image (carousel) */}
                <ProductImage
                    // hard cast => to overcome type safety.
                    images={(productImages as unknown) as ImgProps}
                    productName={name}
                />

                {/* product infos. */}
                <ProductInfo
                    productName={name}
                    prices={prices}
                    description={description}
                    productDetails={productDetails}
                    availableSizes={availableSizes}
                    gems={gems}
                />
            </Flex>

            {/* related products container */}
            <Box>
                <Text
                    textAlign="center"
                    as="h4"
                    variant="h2"
                    mb={[5, 5, 6, 7]}
                    fontWeight="body"
                >
                    {displayText.toUpperCase()}
                </Text>

                {/* related products */}
                <RelatedProducts
                    products={intersectionBy(
                        allProducts,
                        relatedProducts.map(pid => ({ pid })),
                        'pid'
                    )}
                />
                <Flex />
            </Box>
        </Box>
    );
};

export default Products;
