import { useEffect, useState } from "react";

const useTitle = () => {
    const [title, setTitle] = useState(null);

    const updateTitle = () => {
        const htmlTitle = document.querySelector('title');
        htmlTitle.innerHTML = `${title} | Nwitter`;
    };
    useEffect(updateTitle, [title]);
    return setTitle;
};

export default useTitle;