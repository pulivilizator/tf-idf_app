export function dragStartHandler(event, setDrag) {
        event.preventDefault();
        setDrag(true);
    }

export function dragLeaveHandler(event, setDrag) {
    event.preventDefault();
    setDrag(false);
}

export function fileInputClickHandler(event, setFile) {
    event.preventDefault();
    const file = event.target.files[0];
    setFile(file)
}

export function onDropHandler(event, setDrag, setFile, setErr) {
    event.preventDefault();
    if (event.dataTransfer.files.length > 1) {
        setErr(true)
        setDrag(false)
        return
    }
    const file = event.dataTransfer.files[0]
    setFile(file)
    setDrag(false);
}