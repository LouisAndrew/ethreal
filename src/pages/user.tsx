import React, { useState, useEffect } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { useNavigate } from '@reach/router';

import { Layout } from 'components/layout';

import { Order } from 'helper/schema';
import User from 'templates/user';

const UserPage = () => {
    const [user, setUser] = useState<firebase.User | null>(null);
    const [auth, setAuth] = useState<firebase.auth.Auth | undefined>(undefined);
    const [db, setDb] = useState<firebase.firestore.Firestore | null>(null);

    const [orders, setOrders] = useState<Order[]>([]);
    const [mounted, setMounted] = useState(false); // variable to identify if the component is mounted

    const navigate = useNavigate();

    useEffect(() => {
        setUser(firebase.auth().currentUser);
        setAuth(firebase.auth());
        setDb(firebase.firestore());

        // fetching all items ordered by this user.
        fetchItems();
        setMounted(true); // set component mounted to true!
    }, []);

    useEffect(() => {
        if (user) {
            fetchItems();
        }
    }, [user]);

    /**
     * fetching items ordered by this user.
     */
    const fetchItems = async () => {
        if (db && user) {
            try {
                // fetch user instance from db
                const req = await db
                    .collection('user')
                    .doc(user.uid)
                    .get();

                const data = await req.data();

                if (req.exists && data) {
                    // fetch user's orders
                    const ordersData = await data.orders;

                    // fetch items ordered within these orders
                    await fetchOrders(ordersData);
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    /**
     * fetch details for every order a user gas,
     * @param orders
     */
    const fetchOrders = async (orders: string[]) => {
        if (db) {
            const items = Promise.all(
                orders.map(async order => {
                    try {
                        const req = await db
                            .collection('order')
                            .doc(order)
                            .get();

                        const data = await req.data();
                        if (data) {
                            return { ...data, date: data.date.toDate() };
                        }

                        return undefined;
                    } catch (e) {
                        console.error(e);
                        return undefined;
                    }
                })
            );

            setOrders((await items) as Order[]);
        }
    };

    if (!mounted) {
        return null; // return blank page if the component is not mounted yet
    }

    if (!user || !auth) {
        navigate('/auth'); // navigate to auth page if no user is provided
    }

    return user && auth ? (
        <Layout>
            <User user={user} auth={auth} orders={orders} />
        </Layout>
    ) : null;
};

export default UserPage;
