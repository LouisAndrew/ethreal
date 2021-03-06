import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from '@reach/router';

import { Text, Flex, Box } from 'rebass';
import { Icon, InlineIcon } from '@iconify/react';
import menuFill from '@iconify/icons-ri/menu-fill';
import { CSSTransition } from 'react-transition-group';
import closeLine from '@iconify/icons-ri/close-line';
import arrowDownSLine from '@iconify/icons-ri/arrow-down-s-line';

import Cart from './cart';
// import { clearCart } from 'state/actions/cart';
import Dropdown from './dropdown';
import Logo from 'components/logo';
import CartItems from './cart-items';
import CurrencySelector from './currency-selector';
import { IState as ICartState } from 'state/reducers/cart-reducer';
import Account from './account';
import Banner from './banner';
import Modal from '../modal';
import MailingList from '../popups/mailing-list';
import { setShowCart as dispatchShowCart } from 'state/actions/cart';

import './styles.scss';
import './transition.scss';

export type Props = {
    auth: firebase.auth.Auth;
    db: firebase.firestore.Firestore;
    addBanner: boolean;
};

const Navigation: React.FC<Props & ICartState> = ({
    auth,
    db,
    cart,
    wishlist,
    showCart,
    addBanner,
}) => {
    // states for ui changes
    const [showMenuMobile, setShowMenuMobile] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdownL, setShowDropdownL] = useState(false);
    const [currLocation, setCurrLocation] = useState('/');

    const [user, setUser] = useState<firebase.User | null>(null);
    // const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);

    const dispatch = useDispatch();

    /**
     * Dispatching action into the global state store.
     * @param show set TRUE to show cart component.
     */
    const setShowCart = (show: boolean) => {
        dispatch(dispatchShowCart(show));
    };

    // set to true to show modal on homepage.
    const runModal = true;

    useEffect(() => {
        if (auth.currentUser) {
            setUser(auth.currentUser);
        }
        if (window.location) {
            const { pathname } = location;
            setCurrLocation(pathname);

            // set cookie if user visited => not same as cart component.
            // cart uses session storage nav component uses cookie to prevent doubling
            if (runModal) {
                // const visited = document.cookie;

                if (pathname === '/' && !auth.currentUser) {
                    setOpenModal(true);
                    // eslint-disable-next-line @typescript-eslint/tslint/config, immutable/no-mutation
                    document.cookie = 'visited';
                }
            }
        }
    }, []);

    useEffect(() => {
        const modal = document.getElementById('modal');

        if (showMenuMobile) {
            modal?.addEventListener(
                'click',
                e => {
                    const { target } = e;
                    // close mobile menu on clicking any element other than the menu
                    if (target && (target as any).id === 'modal') {
                        setShowMenuMobile(false);
                    }
                },
                true
            );
        }

        if (showCart) {
            document.addEventListener(
                'click',
                e => {
                    const { target } = e;
                    // close cart on clicking any element other than the menu
                    if (
                        (target && (target as any).id === 'modal') ||
                        (target as any).id === 'portal'
                    ) {
                        setShowCart(false);
                    }
                },
                true
            );
        }

        // disable scrolling when menu / cart is opened on mobile devices
        if (showCart || showMenuMobile) {
            // check viewport?
            const width =
                window.innerWidth > 0 ? window.innerWidth : screen.width;

            // disable scrolling
            if (width < 768) {
                adjustScrolling(true);
            }
        } else {
            const html = document.querySelector('html');

            // reset the no-scroll behavior
            if (html && html.style.overflow === 'hidden') {
                adjustScrolling(false); // re-enable scrolling
            }
        }
    }, [showMenuMobile, showCart]);

    /**
     * toggle scrolling when menu and / or cart is open on mobile devices
     * @params noScroll true to disable scrolling
     *
     */
    const adjustScrolling = (noScroll: boolean) => {
        const html = document.querySelector('html');

        if (html) {
            // eslint-disable-next-line @typescript-eslint/tslint/config, immutable/no-mutation
            html.style.overflow = noScroll ? 'hidden' : 'unset'; // unset rather than scroll, to avoid unecessary scrollbar.
        }
    };

    const handleMenuMobile = () => {
        setShowMenuMobile(prev => !prev);
    };

    const toggleShowCart = () => {
        if (showMenuMobile) {
            setShowMenuMobile(false);
        }
        setShowCart(!showCart);
    };

    const shouldRenderBanner = addBanner;

    // mock links for testing purposes
    return (
        <Box as="header">
            {openModal && (
                <Modal center={true}>
                    <MailingList closeModal={() => setOpenModal(false)} />
                </Modal>
            )}
            {shouldRenderBanner && <Banner />}
            <Flex
                variant="outerWrapper"
                bg={showDropdownL ? '#fff' : 'transparent'}
                className={shouldRenderBanner ? 'with-banner' : ''}
                css={`
                    margin: 0 !important;

                    @media screen and (min-width: 48em) and (max-width: 63em) and (orientation: landscape) {
                        padding-top: 16px;
                    }
                `}
            >
                <Box
                    variant="innerWrapper"
                    my={[0, 5, 0]}
                    css={`
                        .hide-on-mobile {
                            display: none;
                        }

                        @media screen and (min-width: 48em) {
                            .hide-on-mobile {
                                display: block;
                            }

                            .hide-on-desktop {
                                display: none;
                            }
                        }

                        & .icons {
                            height: 12px;
                            width: 12px;

                            &.bigger {
                                height: 16px;
                                width: 16px;
                            }

                            &.black-on-dropdown path {
                                fill: ${showDropdownL || currLocation !== '/'
                                    ? '#000'
                                    : '#fff'};
                                stroke: 'transparent';
                            }

                            &.black-on-dropdown-stroke path {
                                stroke: ${showDropdownL || currLocation !== '/'
                                    ? '#000'
                                    : '#fff'};
                            }

                            @media screen and (min-width: 27em) {
                                height: 14px;
                                width: 14px;

                                &.bigger {
                                    height: 18px;
                                    width: 18px;
                                }
                            }

                            @media screen and (min-width: 48em) {
                                height: 18px;
                                width: 18px;
                            }
                        }

                        .cart-badge {
                            color: ${showDropdownL || currLocation !== '/'
                                ? '#000'
                                : '#fff'} !important;
                        }
                    `}
                >
                    {/* Logo */}
                    <Link to="/">
                        <Flex
                            variant="center"
                            css={`
                                position: absolute;
                                z-index: 2;

                                left: 50%;
                                transform: translate(-50%, 0);

                                & svg {
                                    height: 8vh;
                                    width: 20vw;
                                }

                                & svg path {
                                    fill: ${showDropdownL ||
                                    currLocation !== '/'
                                        ? '#000'
                                        : '#fff'};
                                }

                                @media screen and (min-width: 48em) {
                                    width: 12vw;
                                    height: 8vh;
                                    transform: translate(-55%, 8px);
                                }

                                @media screen and (min-width: 64em) {
                                    width: 7vw;
                                    max-width: 100px;
                                    transform: translate(-60%, 8px);
                                }
                            `}
                        >
                            <Logo />
                        </Flex>
                    </Link>

                    <Flex
                        width="100%"
                        height={['8vh', '8vh', '10vh']}
                        alignItems="center"
                        justifyContent="space-between"
                        css={`
                            position: relative;

                            #links-L {
                                display: none;
                            }

                            @media (min-width: 48em) {
                                #links-L {
                                    display: flex;
                                }

                                #menu-mobile {
                                    display: none;
                                }
                            }
                        `}
                    >
                        {/* Links for desktop */}

                        <Flex id="links-L" alignItems="center">
                            <Link to="/about">
                                <Text
                                    variant={
                                        currLocation.includes('about')
                                            ? 'linkActive'
                                            : 'link'
                                    }
                                    color={
                                        showDropdownL || currLocation !== '/'
                                            ? '#000'
                                            : '#fff'
                                    }
                                    py={[0, 0, '5vh']}
                                    width={[
                                        'fit-content',
                                        'fit-content',
                                        '60px',
                                    ]}
                                >
                                    ABOUT
                                </Text>
                            </Link>
                            <Box
                                onMouseEnter={() => setShowDropdownL(true)}
                                onMouseLeave={() => setShowDropdownL(false)}
                            >
                                <Text
                                    variant="link"
                                    py={[0, 0, '5vh']}
                                    color={
                                        showDropdownL || currLocation !== '/'
                                            ? '#000'
                                            : '#fff'
                                    }
                                    width={[
                                        'fit-content',
                                        'fit-content',
                                        '60px',
                                    ]}
                                >
                                    SHOP
                                </Text>
                                <CSSTransition
                                    in={showDropdownL}
                                    timeout={50}
                                    unmountOnExit={true}
                                    classNames="dropdown"
                                >
                                    <Dropdown
                                        goBack={() => setShowDropdown(false)}
                                        currLocation={currLocation}
                                    />
                                </CSSTransition>
                            </Box>
                            <Link to="/blogs">
                                <Text
                                    variant={
                                        currLocation.includes('blog')
                                            ? 'linkActive'
                                            : 'link'
                                    }
                                    color={
                                        showDropdownL || currLocation !== '/'
                                            ? '#000'
                                            : '#fff'
                                    }
                                    py={[0, 0, '5vh']}
                                    width={[
                                        'fit-content',
                                        'fit-content',
                                        '60px',
                                    ]}
                                >
                                    BLOG
                                </Text>
                            </Link>
                        </Flex>

                        {/* menu toggle button for mobile */}
                        <Flex
                            variant="center"
                            onClick={handleMenuMobile}
                            id="menu-mobile"
                        >
                            <Icon
                                icon={showMenuMobile ? closeLine : menuFill}
                                className={`icons ${
                                    showMenuMobile ? 'bigger' : ''
                                }`}
                                color={currLocation !== '/' ? '#000' : '#fff'}
                            />
                        </Flex>

                        {/* Auth and cart. Always show auth component, as it is not in the menu */}
                        <Flex alignItems="center">
                            <CurrencySelector
                                showDropdown={showDropdownL}
                                desktop={true}
                                currLocation={currLocation}
                            />
                            <Account desktop={true} user={user} />
                            <Cart
                                toggleShowCart={toggleShowCart}
                                showCart={showCart}
                                user={user}
                                db={db}
                                cart={cart}
                                wishlist={wishlist}
                            />
                        </Flex>
                    </Flex>

                    {/* Menu on mobile devices */}
                    <CSSTransition
                        in={showMenuMobile}
                        timeout={100}
                        unmountOnExit={true}
                        classNames="links"
                    >
                        <Modal>
                            <Flex
                                id="links-S"
                                bg="#fff"
                                px={[7]}
                                pt={[7]}
                                pb={128}
                                flexDirection="column"
                                sx={{
                                    height: '100vh',
                                    top: 0,
                                    transition: '0.2s',
                                    overflowY: 'scroll',
                                    a: {
                                        textDecoration: 'none',
                                    },
                                }}
                            >
                                <Link to="/about">
                                    <Text
                                        variant={
                                            currLocation.includes('about')
                                                ? 'linkActive'
                                                : 'link'
                                        }
                                        my={[2]}
                                    >
                                        ABOUT
                                    </Text>
                                </Link>
                                <Box>
                                    <Text
                                        variant="link"
                                        my={[2]}
                                        onClick={() =>
                                            setShowDropdown(prev => !prev)
                                        }
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            svg: {
                                                transition: '0.2s',
                                                tansform: showDropdown
                                                    ? 'rotate(180deg) !important'
                                                    : '',
                                            },
                                        }}
                                    >
                                        SHOP
                                        <InlineIcon icon={arrowDownSLine} />
                                    </Text>
                                    <CSSTransition
                                        in={showDropdown}
                                        timeout={100}
                                        unmountOnExit={true}
                                        classNames="dropdown"
                                    >
                                        <Dropdown
                                            goBack={() =>
                                                setShowDropdown(false)
                                            }
                                            currLocation={currLocation}
                                        />
                                    </CSSTransition>
                                </Box>
                                <Link to="/blogs">
                                    <Text
                                        variant={
                                            currLocation.includes('blog')
                                                ? 'linkActive'
                                                : 'link'
                                        }
                                        my={[2]}
                                    >
                                        BLOG
                                    </Text>
                                </Link>
                                <Link to="/contact">
                                    <Text
                                        variant={
                                            currLocation.includes('contact')
                                                ? 'linkActive'
                                                : 'link'
                                        }
                                        my={[2]}
                                    >
                                        CONTACT
                                    </Text>
                                </Link>

                                <Link to="/faq">
                                    <Text
                                        variant={
                                            currLocation.includes('faq')
                                                ? 'linkActive'
                                                : 'link'
                                        }
                                        my={[2]}
                                    >
                                        FAQ
                                    </Text>
                                </Link>

                                <Link to="/size-guide">
                                    <Text
                                        variant={
                                            currLocation.includes('size-guide')
                                                ? 'linkActive'
                                                : 'link'
                                        }
                                        my={[2]}
                                    >
                                        SIZE GUIDE
                                    </Text>
                                </Link>

                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    mt={[2]}
                                >
                                    <Account user={user} desktop={false} />
                                    <CurrencySelector
                                        showDropdown={true}
                                        desktop={false}
                                        currLocation={currLocation}
                                    />
                                </Flex>
                            </Flex>
                        </Modal>
                    </CSSTransition>

                    {/* actual box where it displays all in-cart products */}
                    <CSSTransition
                        in={showCart}
                        timeout={100}
                        unmountOnExit={true}
                        classNames="cart-items"
                    >
                        <CartItems
                            closeCart={() => {
                                setShowCart(false);
                            }}
                            cart={{ cart, wishlist, showCart }}
                        />
                    </CSSTransition>
                </Box>
            </Flex>
        </Box>
    );
};

export { Navigation };
