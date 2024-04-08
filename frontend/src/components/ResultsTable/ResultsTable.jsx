import {observer} from "mobx-react-lite";
import {useStores} from "../../stores/RootStoreContext";
import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";

const ResultsTable = observer(({table}) => {
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 50
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = table ? table.slice(itemOffset, endOffset) : null;
    const pageCount = Math.ceil(table ? Math.ceil(table.length / itemsPerPage) : 0 / itemsPerPage);


    useEffect(() => {
        setItemOffset(0)

    }, [table, pageCount]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % table.length;
        setItemOffset(newOffset);
    };
    return (table && <>
            <section className="result">
                <h2 className="result__title title">Результаты</h2>
                <table className="result__table">
                    <thead>
                    <tr className="row row-1">
                        <th className="head col--min">№</th>
                        <th className="head col col-1">Слово</th>
                        <th className="head col col-2">TF</th>
                        <th className="head col col-3">IDF</th>
                    </tr>
                    </thead>
                    <tbody>
                    <Table items={currentItems}/>
                    </tbody>
                </table>
                <div className={'pagination-wrapper'}>
                    <ReactPaginate
                        initialPage={0}
                        className={'pagination'}
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                    />
                </div>
        </section>
        </>
    )
})

function Table({items}) {
    return items.map((row, index) => <TrElement key={index} el={row}
                                                      index={index}/>)
}

function TrElement({el, index}) {
    return (
        <tr className="row row-2">
            <td className='col--min'>{index+1}</td>
            <td className="col col-1">{el.word}</td>
            <td className="col col-2">{el.tf}</td>
            <td className="col col-3">{el.idf}</td>
        </tr>
    )
}

export default ResultsTable;