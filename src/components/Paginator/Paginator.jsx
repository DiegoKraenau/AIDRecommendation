import { React } from "react";
import './_Paginator.scss';

const Paginator = ({array,arrayPerPage,onChangeValue}) => {
   

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(array.length / arrayPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="paginator_content container flex flex-ai-c">
            {
                <div className="paginator_list">
                    {
                        pageNumbers.map(number => (
                            <button className="page-link" onClick={() => onChangeValue(number)} key={number}>
                                {number}
                            </button>
                        ))
                    }
                </div>

            }
        </div>
    );
}

export default Paginator;