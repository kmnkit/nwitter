import React, { useEffect, useState } from 'react';
import { authService, dbService, storageService } from 'fbase';
import { collection, doc, deleteDoc, updateDoc, where, query, getDocs } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChild } from '@fortawesome/free-solid-svg-icons'

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if (ok) {
            await deleteDoc(doc(dbService, "nweets", nweetObj.id));
            if (nweetObj.attachmentUrl !== "") {
                await deleteObject(ref(storageService, nweetObj.attachmentUrl));
            }
        }
    };
    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async (e) => {
        e.preventDefault();
        const nweetDoc = doc(dbService, "nweets", nweetObj.id);
        await updateDoc(nweetDoc, {
            text: newNweet
        });
        setEditing(false);
    };
    const onChange = (e) => {
        const {
            target: { value }
        } = e;
        setNewNweet(value);
    }

    return (
        <div key={nweetObj.id}>
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="editNweetBox">
                        <input
                            type="text"
                            placeholder="Edit your Nweet"
                            value={newNweet}
                            onChange={onChange}
                            required
                        />
                        <div>
                            <input type="submit" value="Update Nweet" className="updateBtn" />
                            <button onClick={toggleEditing} className="cancelBtn">Cancel</button>
                        </div>
                    </form>
                </>
            ) : (
                <div className="NweetBox">
                    <div className="PhotoContainer">
                        <div className="Photo">
                            <FontAwesomeIcon className="usericon" icon={faChild} />
                        </div>
                    </div>
                    <div className="NweetContainer">
                        <span className="userInfo">{nweetObj.creatorId}</span>
                        <div class="NweetContainer__inner">
                            <p class="nweetText">
                                {nweetObj.text}
                            </p>
                            {nweetObj.attachmentUrl && (
                                <img src={nweetObj.attachmentUrl} width="50px" height="50px" alt="" />
                            )}
                            {isOwner && (
                                <div className="btnContainer">
                                    <button className="Btn delBtn" onClick={onDeleteClick}>Delete Nweet</button>
                                    <button className="Btn editBtn" onClick={toggleEditing}>Edit Nweet</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default Nweet;