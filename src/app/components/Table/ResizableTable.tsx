import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
const ResizableTable = ({ numRows, numCols }:any) => {
  const [rows, setRows] = useState(numRows);
  const [cols, setCols] = useState(numCols);
  const [tableData, setTableData] = useState(
    Array(numRows).fill(null).map(() => Array(numCols).fill(''))
  );

  const [columnWidths, setColumnWidths] = useState(Array(numCols).fill(100)); // Default column width

  useEffect(() => {
    setRows(numRows);
    setCols(numCols);
    setTableData(Array(numRows).fill(null).map(() => Array(numCols).fill('')));
    setColumnWidths(Array(numCols).fill(100)); // Reset column widths
  }, [numRows, numCols]);
  const handleResize = (index : any) => (event: any, { size }:any) => {
    const newWidth = size.width;
    setColumnWidths(prevWidths => {
      const newWidths = [...prevWidths];
      newWidths[index] = newWidth;
      return newWidths;
    });
  };
  const handleCellChange = (rowIndex:any, colIndex:any, value:any) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
  };

  const addRow = () => {
    setRows((prevRows:any) => {
      const newRows = prevRows + 1;
      setTableData(prevData => [
        ...prevData,
        Array(cols).fill('')
      ]);
      return newRows;
    });
  };

  const addCol = () => {
    setCols((prevCols:any )=> {
      const newCols = prevCols + 1;
      setTableData(prevData =>
        prevData.map(row => [...row, ''])
      );
      return newCols;
    });
  };

  return (
    <div>
      <Button onClick={addRow}>Add Row</Button>
      <Button onClick={addCol}>Add Column</Button>
      <table>
        <thead>
          <tr>
            {Array(cols).fill(null).map((_, index) => (
              <th key={index} style={{ width: '100px' }}>
                <ResizableBox
                  width={100}
                  height={30}
                  axis="x"
                  minConstraints={[50, 30]}
                  maxConstraints={[300, 30]}
                  onResize={handleResize}
                >
                  <div style={{ width: '100%', height: '100%', border: '1px solid black' }}>
                    Column {index + 1}
                  </div>
                </ResizableBox>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr className='border bg-black'  key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                    style={{ width: '100px', height: '30px' }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResizableTable;
