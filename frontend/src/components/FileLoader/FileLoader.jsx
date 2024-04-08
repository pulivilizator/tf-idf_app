import {useEffect, useRef, useState} from "react";
import {
    dragLeaveHandler,
    dragStartHandler,
    fileInputClickHandler,
    onDropHandler
} from "./handlers";
import useSendFile from "../hooks/useSendFile";
import {observer} from "mobx-react-lite";
import {useSetTableData} from "../hooks/useSetTableData";
import useFileExists from "../hooks/useFileExists";



const FileLoader = observer( ({changeStatus, changeTable, status}) => {

    const [drag, setDrag] = useState(false);
    const [file, setFile] = useState(null);
    const [err, setErr] = useState(false);
    const fileKey = file ? [file.name, file.lastModified, file.size].join(':') : null
    if (fileKey) sessionStorage.setItem(fileKey, fileKey);
    const fileMutate = useSendFile()

    useEffect(() => {
        if (file) {
            fileMutate(file)
        }
    }, [file, fileMutate]);

    useFileExists(fileKey, changeStatus);

    useSetTableData(fileKey, changeTable, status, changeStatus);

    return (
            <DragAndDropField drag={drag} err={err} changeDrag={setDrag} changeFile={setFile} changeErr={setErr}/>
    )
})

function DragAndDropField({drag, err,
                          changeDrag=e=>e,
                          changeFile=f=>f,
                          changeErr=e=>e}) {
    const fileInputRef = useRef();
    return (
        <>
            {
                drag
                    ?
                    <section
                        className={'form form--active'}
                        onDragStart={event => dragStartHandler(event, e => changeDrag(e))}
                        onDragLeave={event => dragLeaveHandler(event, e => changeDrag(e))}
                        onDragOver={event => dragStartHandler(event, e => changeDrag(e))}
                        onDrop={event => onDropHandler(event,
                            e => changeDrag(e),
                            f=>changeFile(f),
                            er=>changeErr(er)
                        )}>
                        <p className="form__description">Отпустите файлы</p>
                    </section>
                    :
                    <>
                    <section
                        className={'form'}
                        onDragStart={event => dragStartHandler(event, e => changeDrag(e))}
                        onDragLeave={event => dragLeaveHandler(event, e => changeDrag(e))}
                        onDragOver={event => dragStartHandler(event, e => changeDrag(e))}
                        onClick={() => fileInputRef.current.click()}>
                        <p className="form__description">Перетащите
                            файлы</p>
                    </section>
                    <input
                        onChange={e => fileInputClickHandler(e, f => changeFile(f))}
                        multiple={false} ref={fileInputRef} type={"file"}
                        hidden={true}/>
                    </>
            }
        </>
    )
}

export default FileLoader;