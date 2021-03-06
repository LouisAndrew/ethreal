import React from 'react';
import { flatten } from 'lodash';

import { Box, Heading, Text, Flex } from 'rebass';

import Product from './product';

import { IState as ICartState } from 'state/reducers/cart-reducer';
import { Currencies } from 'state/reducers/currency-reducer';
import { getTotal } from 'helper/get-total-price';

type Props = ICartState & {
    currency: Currencies;
};

/**
 * Component to display the summary of current order's products.
 * User should be able to check the products they ordered.
 */
const ProductsSummary: React.FC<Props> = ({ cart, currency }) => {
    // taken from cart-items.tsx
    const cartMapped = cart.map(item => {
        const notes = item.note.map(o => ({ ...item, ...o, note: undefined }));

        return notes;
    });

    /**
     * sorting the mapped data => avoid unconsistent order of items on cart component
     */
    const data = flatten(cartMapped);

    const gridTemplate = [
        '1fr',
        '1fr',
        'repeat(4, minmax(120px, 1fr)) minmax(120px, auto)',
    ];

    const gridHeadingSyling = {
        display: ['none', 'none', 'block'],
        gridRow: '1/2',
        mb: 5,
        textAlign: ['left', 'left', 'center'],
    };

    return (
        <Box>
            <Heading
                as="h2"
                fontSize={[2, 2, 3]}
                fontWeight="bold"
                mt={[4]}
                mb={[6]}
                textAlign="left"
            >
                ORDER SUMMARY
            </Heading>

            {/* product wrapper => box on mobilem table on desktop */}
            <Box
                className="product-wrapper"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: gridTemplate,
                    gridGap: 2,
                    '& .checkout-product': {
                        borderTopWidth: [0, 0, 1],
                    },
                }}
            >
                <Box width="auto" />

                {/* render grid heading */}
                <Text
                    variant="h3"
                    sx={{ ...gridHeadingSyling, gridColumn: '2 / 3' }}
                >
                    PRODUCT NAME
                </Text>
                <Text
                    variant="h3"
                    sx={{ ...gridHeadingSyling, gridColumn: '3 / 4' }}
                >
                    DETAILS
                </Text>
                <Text
                    variant="h3"
                    sx={{ ...gridHeadingSyling, gridColumn: '4 / 5' }}
                >
                    QUANTITY
                </Text>
                <Text
                    variant="h3"
                    sx={{
                        ...gridHeadingSyling,
                        gridColumn: '5 / 6',
                        textAlign: 'right',
                        pr: [0, 0, 5],
                    }}
                >
                    PRICE
                </Text>

                {/* render products */}
                {data.map((item, i) => (
                    <Product
                        item={item}
                        currency={currency}
                        first={i === 0}
                        gridTemplate={gridTemplate}
                        key={`checkout-${item.product.pid}-${JSON.stringify(
                            item.details
                        )}`}
                    />
                ))}
            </Box>

            {/* TOTAL PRICE */}
            <Flex
                py={[4]}
                justifyContent="space-between"
                sx={{
                    borderWidth: 0,
                    borderColor: 'black.0',
                    borderStyle: 'solid',
                    borderBottomWidth: 1,
                }}
            >
                <Text variant="h4" fontSize={[1, 1, 1]}>
                    TOTAL
                </Text>
                <Text variant="h4" fontSize={[1, 1, 1]}>
                    {/* {currency === Currencies.IDR
                        ? `IDR ${getTotalPriceIdr(data)}`
                        : `AUD ${getTotalPriceAud(data)}`} */}
                    {getTotal(data, currency)}
                </Text>
            </Flex>
        </Box>
    );
};

export { ProductsSummary };
