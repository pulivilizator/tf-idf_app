import {makeAutoObservable} from "mobx";


class TableStore {
    status = 'processing'
    table = null;

    constructor() {
        makeAutoObservable(this)
    }

    changeTable = (data) => {
        this.table = data
    }

    changeStatus = (status) => {
        this.status = status
    }
}
export default TableStore;