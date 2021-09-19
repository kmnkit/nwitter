import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { dbService, storageService } from "fbase";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const NweetFactory = ({ userObj }) => {
    const [attachment, setAttachment] = useState("");
    const [nweet, setNweet] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            // 스토리지와 레퍼런스 호출
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const resp = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(resp.ref);
        }
        // Nweet 텍스트 부분 저장
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: serverTimestamp(),
            creatorId: userObj.uid,
            attachmentUrl
        });
        setNweet("");
        setAttachment("");
    };

    const onChange = (e) => {
        const { target: { value } } = e;
        setNweet(value);
    };

    const onFileChange = (e) => {
        const { target: { files } } = e;
        const theFile = files[0]; // multiple에 대비하기 위해 리스트 형태임
        const reader = new FileReader(); // Browser API        
        /*
        onloadend
        readAsDataURL 함수에 전달할 인자,
        즉, 파일이 함수로 들어간 이후 결과값이 나온 다음 상황을 감지함
        그 때 생긴 이벤트값을 사용할 수 있게 해 줌.
        이벤트 값에는 우리가 원하는 파일 URL이 있음.
         */
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result }
            } = finishedEvent;
            setAttachment(result);
        };
        /*
        readAsDataURL
        파일 정보를 인자로 받아서 파일 위치를 URL로 반환해 줌.
        단순히 호출하는 방식으로는 사용할 수 없음
        리액트 생명주기 함수처럼 파일 선택 후,
        '웹 브라우저가 파일을 인식하는 시점', '웹 브라우저 파일 인식이 끝난 시점' 등을 포함.
        시점까지 함께 관리해 줘야 URL을 얻을 수 있음.
         */
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => setAttachment("");

    return (
        <form onSubmit={onSubmit}>
            <input
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
            />
            <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
            />
            <input
                type="submit"
                value="Nweet"
            />
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )}
        </form>
    );
};

export default NweetFactory;