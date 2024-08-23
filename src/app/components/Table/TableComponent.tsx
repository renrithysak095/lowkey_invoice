import React, { useState } from 'react';

const TableComponent = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [cellData, setCellData] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(''))
  );

  const handleAddRow = () => {
    setRows(rows + 1);
    setCellData([...cellData, Array(cols).fill('')]);
  };

  const handleAddCol = () => {
    setCols(cols + 1);
    setCellData(cellData.map(row => [...row, '']));
  };

  const handleCellChange = (rowIndex:any, colIndex:any, value:any) => {
    const updatedData = cellData.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : cell))
    );
    setCellData(updatedData);
  };

  return (
    <div>
      <div className="mb-2">
        <button onClick={handleAddRow}>Add Row</button>
        <button onClick={handleAddCol}>Add Column</button>
      </div>
      <table className="border-collapse border border-gray-400">
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <th key={colIndex} className="border border-gray-300 p-2">Column {colIndex + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cellData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
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

export default TableComponent;
