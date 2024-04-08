import {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import fileServices from "../../services/fileServices";

export default function useFileExists(fileKey, changeStatus) {
    const {refetch} = useQuery({
        queryFn: () => {
            return fileServices.existsFile(fileKey)
        },
        enabled: false
    })
    useEffect(() => {
        if (fileKey) {
            const interval = setInterval(() => {
                refetch().then((newData) => {
                    changeStatus(newData.data.status);
                    if (newData.data.status === 'ready') {
                        clearInterval(interval)
                    }
                })
            }, 1000);
        }
    }, [fileKey]);

}