import uniqBy from "lodash.uniqby";
import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { collection, limit, orderBy, startAfter, onSnapshot, query } from "firebase/firestore";
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';
import { useInfiniteScroll } from 'components/useInfiniteScroll';

const Home = ({ userObj }) => {
    const items = 10; // 초기 fetch될 데이터 수
    const page = useInfiniteScroll();

    const [nweets, setNweets] = useState([]);
    const [error, setError] = useState(false);
    const [last, setLast] = useState([]);

    useEffect(() => {
        try {
            const q = query(
                collection(
                    dbService, "nweets"),
                orderBy('createdAt', 'desc'),
                limit(items));
            onSnapshot(q, (querySnapshot) => {
                const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                setLast(lastVisible);
                const nweetArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setNweets(nweetArray);
            });
        } catch (err) {
            setError(err);
        }
    }, []);

    useEffect(() => {
        console.log('두번째 이후 라스트');
        console.log(last);
        try {
            const q = query(
                collection(dbService, "nweets"),
                orderBy('createdAt', 'desc'),
                startAfter(last),
                limit(items),
            );
            onSnapshot(q, (querySnapshot) => {
                const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                setLast(lastVisible);
                const nweetArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                const datas = [...nweets, ...nweetArray];
                setNweets(uniqBy(datas, "id"));
            });
        } catch (err) {
            setError(err);
            console.log('페이지 갱신 후 useEffect 에러');
            console.log(err);
            console.log(last);
        }
    }, [page]);

    return (
        <>
            <NweetFactory userObj={userObj} />
            <div>
                {nweets.map(nweet => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </>
    );
};
export default Home;