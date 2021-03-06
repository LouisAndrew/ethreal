import React from 'react';
// import { useFirestore, useStorage } from 'reactfire';
import { useDispatch, connect } from 'react-redux';
import { set } from 'lodash';
import firebase from 'gatsby-plugin-firebase';

// this package needs to be imported on every async function file.
import 'regenerator-runtime/runtime';
import { fetchProducts, storeProducts } from 'state/actions/products';

// Mock component to simulate how the data is being fetched from firebase (data is provided by flamelink and needed special
// query)
const Clicker: React.FC<{ products: any }> = ({ products }) => {
    const db = firebase.firestore;
    const storage = firebase.storage;
    const dispatch = useDispatch();

    // do i need this ??
    // Function to fetch data from the firestore AND transforming the refernce into an actual imguRl
    const fetchDatas = async () => {
        await dispatch(fetchProducts());

        try {
            const req = await db()
                .collection('fl_content')
                .where('_fl_meta_.schema', '==', 'product')
                .get();

            const rsp = await Promise.all(
                req.docs.map(async doc => {
                    const data: firebase.firestore.DocumentData = doc.data();

                    if (await data.image) {
                        const reqImg: firebase.firestore.DocumentData[] = await Promise.all(
                            data.image.map(
                                (ref: firebase.firestore.DocumentReference) =>
                                    ref.get().then(imgDoc => imgDoc.data())
                            )
                        );

                        // get download url from img reference object.
                        const imgDownloadUrls: string[] = await Promise.all(
                            reqImg.map(async ref => {
                                try {
                                    const downloadUrlReq = await storage()
                                        .ref(`flamelink/media/${ref.file}`)
                                        .getDownloadURL();
                                    // get download url should return a string.
                                    return await downloadUrlReq;
                                } catch (err) {
                                    console.log(err);
                                    return '';
                                }
                            })
                        );

                        await set(data, 'image', imgDownloadUrls);
                    }

                    // get collection's name from reference object referencing a collection.
                    if (await data.collection) {
                        try {
                            const reqCollection: firebase.firestore.DocumentData = await data.collection
                                .get()
                                .then(
                                    (
                                        collectionDoc: firebase.firestore.DocumentData
                                    ) => collectionDoc.data()
                                );

                            await set(data, 'collection', reqCollection.name);
                        } catch (err) {
                            console.log(err);
                            return '';
                        }
                    }

                    return data;
                })
            );

            await dispatch(storeProducts(rsp));
        } catch (err) {
            console.log('something went wrong');
            console.log(err);
        }
    };

    const transformImges = async () => {
        console.log(products);
    };

    return (
        <>
            <button onClick={fetchDatas}>Fetch Datas</button>
            <button onClick={transformImges}>Transform images</button>
        </>
    );
};

const mapStateToProps = (state: any) => ({
    products: state.productReducer.data,
});

export default connect(mapStateToProps)(Clicker);
