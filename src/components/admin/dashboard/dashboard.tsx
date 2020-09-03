import React, { useState } from 'react';
import { Flex, Box } from 'rebass';

import Orders from './orders';
import Navigation from './navigation';

type Props = {
    db: firebase.firestore.Firestore;
    logout: () => void;
};

export enum StateViews {
    ORDERS,
    ADMINS,
    LINKS,
    NONE,
}

const Dashboard: React.FC<Props> = ({ logout, db }) => {
    const [view, setView] = useState<StateViews>(StateViews.NONE);

    const changeView = (viewName: StateViews) => {
        setView(viewName);
    };

    // eslint-disable-next-line immutable/no-let, @typescript-eslint/tslint/config
    let toRender;
    switch (view) {
        case StateViews.ORDERS:
            toRender = <Orders db={db} />;
            break;
        case StateViews.ADMINS:
            toRender = <h1>Admins</h1>;
            break;
        case StateViews.LINKS:
            toRender = <h1>Links</h1>;
            break;
        case StateViews.NONE:
            toRender = <h1>None</h1>;
            break;
        default:
            toRender = <h1>None</h1>;
            break;
    }

    return (
        <Flex
            data-testid="dashboard"
            minHeight="100vh"
            bg="brown.0"
            flexDirection={['column-reverse', 'column-reverse', 'row']}
            justifyContent="space-between"
            css={`
                box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.125);
            `}
        >
            {/* Navigation */}
            <Box width={['100%', '100%', 'fit-content']}>
                <Navigation
                    logout={logout}
                    changeView={changeView}
                    inView={view}
                />
            </Box>
            <Box width="100%" height={['90vh', '100vh']} flex={1} p={[5]}>
                <Box
                    bg="white.0"
                    height="100%"
                    maxHeight={['100%']}
                    overflowY="scroll"
                    width="100%"
                    p={[5, 5, 7]}
                    css={`
                        box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.25);
                        border-radius: 4px;
                        /* border: 2px solid rgba(0, 0, 0, 0.4); */
                    `}
                >
                    {toRender}
                </Box>
            </Box>
        </Flex>
    );
};

export { Dashboard };
