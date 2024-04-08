import {useMutation} from "@tanstack/react-query";
import fileServices from "../../services/fileServices";

export default function useSendFile() {
    const mutation = useMutation({
        mutationFn: (file) => {
            const formData = new FormData();

            const fileKey = [file.name, file.lastModified, file.size].join(':')
            formData.append('fileKey', fileKey)
            sessionStorage.setItem(fileKey, fileKey)

            formData.append('file', file)

            const keys = get_local_keys()
            formData.append('keys', keys)


            return fileServices.sendFile(formData)
        }
    })
    return mutation.mutate;
}

export function get_local_keys() {
    let keys = [];
    for (let i = 0; i < sessionStorage.length; i++) {
        keys.push(sessionStorage.key(i));
    }
    return JSON.stringify(keys)
}
