import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
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
    const onSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: serverTimestamp(),
            creatorId: userObj.uid
        });
        setNweet("");
    };
    const onChange = (e) => {
        const { target: { value } } = e;
        setNweet(value);
    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={nweet}
                    onChange={onChange}
                    placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map(nweet => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))};
            </div>
        </>
    );
};
export default Home;