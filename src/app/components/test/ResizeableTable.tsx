import React, { useState, useMemo } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ResizableTable = ({ data }: any) => {
    const [columnWidths, setColumnWidths] = useState([200, 200, 200]); // Initial width for each column
    const [rowHeights, setRowHeights] = useState(data.map(() => 50)); // Initial height for each row

    const handleColumnResize = (index: any, event: any, { size }: any) => {
        setColumnWidths(oldWidths => {
            const newWidths = [...oldWidths];
            newWidths[index] = size.width;
            return newWidths;
        });
    };

    const handleRowResize = (index: any, event: any, { size }: any) => {
        setRowHeights((oldHeights: any) => {
            const newHeights = [...oldHeights];
            newHeights[index] = size.height;
            return newHeights;
        });
    };

    return (
        <table className="border-collapse p-3 h-full w-full">
            <thead>
                <tr>
                    {['Company', 'Contact', 'Country'].map((header, index) => (
                        <Resizable
                            key={index}
                            height={0}
                            width={columnWidths[index]}
                            onResize={(e, data) => handleColumnResize(index, e, data)}
                            handle={<span className="react-resizable-handle" />}
                        >
                            <th
                                style={{ width: columnWidths[index] }}
                                className="border p-2"
                            >
                                {header}
                            </th>
                        </Resizable>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row: any, rowIndex: any) => (
                    <Resizable
                        key={rowIndex}
                        height={rowHeights[rowIndex]}
                        width={0} // We only want to resize height
                        onResize={(e, data) => handleRowResize(rowIndex, e, data)}
                        handle={<span className="react-resizable-handle" />}
                    >
                        <tr style={{ height: rowHeights[rowIndex] }}>
                            <td style={{ width: columnWidths[0] }} className="border p-2">
                                {row.company}
                            </td>
                            <td style={{ width: columnWidths[1] }} className="border p-2">
                                {row.contact}
                            </td>
                            <td style={{ width: columnWidths[2] }} className="border p-2">
                                {row.country}
                            </td>
                        </tr>
                    </Resizable>
                ))}
            </tbody>
        </table>
    );
};


export default ResizableTable