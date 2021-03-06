import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';

// import { render, cleanup } from '@testing-library/react'
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Shop, ShopType } from '../shop';
import { mockProducts } from 'helper/const';

describe('Shop', () => {
    const Element = <Shop products={mockProducts} type={ShopType.SHOP_ALL} />;

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    /* it('renders correctly', () => {
		const { getByTestId } = render()
	}) */

    // it('matches snapshot', () => {
    //     const run = false;

    //     if (run) {
    //         const tree = renderer.create(Element).toJSON();
    //         expect(tree).toMatchSnapshot();
    //     }
    // });
});
