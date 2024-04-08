import React from "react"

import FileLoader from "./FileLoader/FileLoader";
import ResultsTable from "./ResultsTable/ResultsTable";
import {RootStoreContext, useStores} from "../stores/RootStoreContext";
import {RootStore} from "../stores/rootStore";
import HistoryMenu from "./HistoryMenu/HistoryMenu";
import {observer} from "mobx-react-lite";



const App = observer(() => {
    const {TableStore: {changeStatus, changeTable, status, table}} = useStores();
  return (
    <>
        <FileLoader changeTable={changeTable} changeStatus={changeStatus} status={status}/>
        <ResultsTable table={table}/>
        <HistoryMenu changeTable={changeTable} changeStatus={changeStatus} status={status}/>
    </>
  )
})

export default App;
