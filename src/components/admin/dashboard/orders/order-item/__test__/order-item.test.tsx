import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { OrderItem } from '../order-item';
import { mockOrder, mockOrderShipped, mockProducts } from 'helper/const';

describe('OrderItem Component', () => {
    const mockUpdateShipping = jest.fn(() => {});

    const el: React.ReactElement = (
        <OrderItem
            order={mockOrder}
            allProducts={mockProducts}
            updateShipping={mockUpdateShipping}
        />
    );
    const elShipped: React.ReactElement = (
        <OrderItem
            order={mockOrderShipped}
            allProducts={mockProducts}
            updateShipping={mockUpdateShipping}
        />
    );

    afterEach(cleanup);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(el, div);
    });

    it('should display a form asking for shipping info whenever admin checked the delivered checkbox', () => {
        const { queryByText, queryByTestId, getByRole } = render(el);
        const NotShippedKeyword = queryByText(
            'Status: Not shipped'
        ) as HTMLInputElement;

        if (NotShippedKeyword) {
            expect(NotShippedKeyword).toBeInTheDocument();
        } else {
            fail();
        }

        const ConfirmShipButton = getByRole('button');

        userEvent.click(ConfirmShipButton);

        setTimeout(() => {
            const ShippingDataForm = queryByTestId('shipping-info-form');
            if (ShippingDataForm) {
                expect(ShippingDataForm).toBeInTheDocument();
            } else {
                fail();
            }
        }, 300);
    });

    it('should not display the shipping infos if the order has already shipped', () => {
        const { queryByTestId } = render(elShipped);
        const ShippingInfoCard = queryByTestId('shipping-info');

        if (!ShippingInfoCard) {
            fail();
        } else {
            expect(ShippingInfoCard).toBeInTheDocument();
        }
    });

    it('matches snapshot', () => {
        const tree = renderer.create(el).toJSON();
        expect(tree).toMatchSnapshot();
    });
});