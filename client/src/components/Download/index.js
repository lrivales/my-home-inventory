import React from "react";
import ReactExport from '@ibrahimrahmani/react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Download = ({ items }) => {
    return (
        <ExcelFile element={<button className="btn btn-lg bg-color-tertiary text-light">Download List</button>}>
            <ExcelSheet data={items} name="Items">
                <ExcelColumn label="Name" value="name"/>
                <ExcelColumn label="Description" value="description"/>
                <ExcelColumn label="Value" value="value"/>
            </ExcelSheet>
        </ExcelFile>
    );
};

export default Download;