import React from "react";
import "./ui.css"; 

const Table = ({ headers, data, renderRow }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>{renderRow(item)}</tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
