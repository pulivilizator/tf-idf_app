import {get_local_keys} from "../hooks/useSendFile";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {useQuery} from "@tanstack/react-query";
import fileServices from "../../services/fileServices";
import axios from "axios";


const HistoryMenu = observer(({changeTable}) => {
    const [fileKey, setFileKey] = useState(null);
    const keys = get_local_keys()

    const files = JSON.parse(keys)



    const {isLoading, data} = useQuery({
        queryKey: ['historyFile', fileKey],
        queryFn: () => {
            return fileServices.getTable(fileKey, keys)
        },
        enabled: Boolean(fileKey)
    })

    useEffect(() => {
        if (!isLoading) {
            changeTable(data)
        }
    }, [isLoading, data]);

    return (
        <section className="aside">
            <h2 className="aside__title title">История файлов</h2>
            <ul className="files-list">
                {files.map((file, index) => <LiCreate key={index} el={file} setKey={setFileKey}/>)}
            </ul>
        </section>
    )
})

function LiCreate({el, setKey}) {
    return (
        <li className="file">
            <button
                className="link"
                type="submit"
                onClick={() => setKey(el)}>
                {el.split(':')[0]}
            </button>
        </li>
    )
}

export default HistoryMenu;