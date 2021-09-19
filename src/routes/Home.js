import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';


const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        const q = query(collection(dbService, "nweets"), orderBy("createdAt", "desc"));
        onSnapshot(q, (querySnapshot) => {
            const nweetArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNweets(nweetArray);
        });
    }, []);

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