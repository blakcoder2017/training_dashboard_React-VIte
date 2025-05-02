import React, {useState} from 'react';
import { useSelector } from 'react-redux';




const DataTable = ({ itemsPerPage = 20 }) => {
  const {allData} = useSelector(state=>state.chart);
  const [currentPage, setCurrentPage] = useState(1);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = allData.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(allData.length / itemsPerPage);
  
 
  
  const pageNumbers = [];
  
  for (let i = 1; i <+ totalPages; i++){
    pageNumbers.push(i);
  }
  
  
  
  return (
    <div className="table-responsive p-3">
      <table className="table table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>District</th>
            <th>Community</th>
            <th>Registrant</th>
            <th>Training Date</th>
            <th>Trainer</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.district}</td>
              <td>{row.community}</td>
              <td>{row.registrant}</td>
              <td>{row.training_date}</td>
              <td>{row.trainer}</td>
              <td>{row.gender}</td>
            </tr>
          ))}
          {allData.length === 0 &&(
            <tr><td colSpan="7">No data available!</td></tr>
          )}
        </tbody>
      </table>
      
      
    </div>
    
    

  );
};

export default DataTable;
