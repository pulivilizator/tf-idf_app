import {useQuery} from "@tanstack/react-query";
import {useEffect} from "react";
import {get_local_keys} from "./useSendFile";
import fileServices from "../../services/fileServices";
import useFileExists from "./useFileExists";


export function useSetTableData(fileKey, setTableData, status, changeStatus) {
    const keys = get_local_keys()
    const {isLoading, data} = useQuery({
        queryKey: ['file', fileKey],
        queryFn: () => {
            return fileServices.getTable(fileKey, keys)
        },
        gcTime: 0,
        enabled: status === 'ready' && Boolean(fileKey)
    })
    useEffect(() => {
        if (!isLoading && data && status === 'ready') {
            setTableData(data)
            changeStatus('processing')
        }
    }, [setTableData, isLoading, data, status]);
}