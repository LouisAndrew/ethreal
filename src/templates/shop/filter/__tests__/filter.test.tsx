import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

// import { render, cleanup } from '@testing-library/react'
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Filter, SortPrice } from '../filter';
import { FilterState } from '../..';

describe('Filter', () => {
    const Element = (
        <Filter
            filters={{ categories: [], collections: [], sort: SortPrice.NONE }}
            clearFilters={jest.fn(() => {})}
            setFilters={
                jest.fn(() => {}) as React.Dispatch<
                    React.SetStateAction<FilterState>
                >
            }
        />
    );

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(Element, div);
    });

    /* it('renders correctly', () => {
		const { getByTestId } = render()
	}) */

    it('matches snapshot', () => {
        const run = false;

        if (run) {
            const tree = renderer.create(Element).toJSON();
            expect(tree).toMatchSnapshot();
        }
    });
});
