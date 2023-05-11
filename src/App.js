import React, { useState, useEffect } from "react";
import "./App.css";
import { data } from "./demo-data";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [offset, setOffset] = useState(10);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let filteredData = data.filter((bank) => {
      let b = false;
      if (data.length > 0) {
        for (let key in data[0]) {
          if (
            bank[key] &&
            bank[key]
              .toString()
              .toLowerCase()
              .includes(searchText.toString().toLowerCase())
          ) {
            b = true;
          }
        }
      }
      return b;
    });
    setPages(Math.floor((filteredData.length + (offset - 1)) / offset));
    setTotal(filteredData.length);
    const startIdx = 0;
    const endIdx = offset - 1;
    filteredData = filteredData.filter((bank, idx) => {
      return idx <= endIdx && idx >= startIdx;
    });
    setDataToDisplay(filteredData);
    setCurrentPage(1);
  }, [searchText]);

  useEffect(() => {
    let filteredData = data.filter((bank) => {
      let b = false;
      if (data.length > 0) {
        for (let key in data[0]) {
          if (
            bank[key] &&
            bank[key]
              .toString()
              .toLowerCase()
              .includes(searchText.toString().toLowerCase())
          ) {
            b = true;
          }
        }
      }
      return b;
    });
    console.log(filteredData);
    const startIdx = (currentPage - 1) * offset;
    const endIdx = currentPage * offset - 1;
    console.log({ startIdx, endIdx });
    filteredData = filteredData.filter((bank, idx) => {
      console.log(idx, idx <= endIdx && idx >= startIdx);
      return idx <= endIdx && idx >= startIdx;
    });
    setDataToDisplay(filteredData);
    console.log({ startIdx, endIdx });
  }, [currentPage]);

  // did mount
  useEffect(() => {
    setPages(Math.floor((data.length + (offset - 1)) / offset));
    const startIdx = 0;
    const endIdx = offset - 1;
    setTotal(data.length);
    console.log(startIdx);
    console.log(data);
    const filteredData = data.filter((bank, idx) => {
      return idx <= endIdx && idx >= startIdx;
    });
    console.log(filteredData);
    setDataToDisplay(filteredData);
  }, [data, offset]);

  return (
    <div style={{ height: "100vh" }} className="app">
      <div className="row justify-content-center align-items-center h-100 m-5 p-2">
        <div className="card">
        <div style={{ maxWidth: "12rem", margin: "10px 0px" }}>
              <input
                type="text"
                className="form-control rounded-0"
                aria-label="Notes"
                aria-describedby="basic-addon1"
                placeholder="Search"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                value={searchText}
              />
            </div>
          <div className="card-body m-0 p-0">
            <table className="w-100 border">
              <tr className="border-bottom">
                <th className="text-center py-2">Transaction ID</th>
                <th className="text-center py-2">Account Number</th>
                <th className="text-center py-2">User</th>
                <th className="text-center py-2">Date</th>
                <th className="text-center py-2">Amount</th>
                <th className="text-center py-2">Status</th>
                <th className="text-center py-2">Remarks</th>
              </tr>
              {dataToDisplay.map((transaction) => (
                <tr>
                  <td className="py-2 text-center">
                    {transaction.transactionId}
                  </td>
                  <td className="py-2 text-center">
                    {transaction.userAccountNumber}
                  </td>
                  <td className="py-2 text-center">{transaction.userName}</td>
                  <td className="py-2 text-center">{transaction.date}</td>
                  <td className="py-2 text-center">{transaction.amount}</td>
                  <td className="py-2 text-center px-2">
                    <span
                      className={`badge p-2 w-90 text-center rounded-pill bg-${
                        transaction.status == "pending"
                          ? "warning"
                          : transaction.status == "completed"
                          ? "success"
                          : "danger"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-2 text-center">
                    {transaction.description}
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <Pagination
            page={currentPage}
            limit={pages}
            callback={(page) => {
              setCurrentPage(page);
            }}
            count={dataToDisplay.length}
            total={total}
            callback2={(offsetValue) => {
              setOffset(offsetValue);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ page, limit, callback, total, count, callback2 }) => {
  const offsetArr = [10, 25, 50, 100, 500, 1000];
  return (
    <div className="row justify-content-between py-2">
      <strong className='col'>{`Showing ${count} of ${total} entries`}</strong>
      <div className="d-flex col justify-content-end btn-group">
        <select
          className="rounded-0 form-select-sm"
          aria-label="offset"
          onChange={(e) => {
            callback2(e.target.value);
          }}
        >
          {offsetArr.map((offset) => (
            <option value={offset}>{offset}</option>
          ))}
        </select>
        {page - 2 > 0 ? (
          <button
            onClick={() => {
              callback(page - 1);
            }}
            variant="light"
            className="rounded-0 btn-primary"
          >
            {"Previous"}
          </button>
        ) : null}

        {page - 1 > 0 ? (
          <button
            onClick={() => {
              callback(page - 1);
            }}
            variant="light"
            className="rounded-0 btn-primary"
          >
            {" "}
            {(page - 1).toString()}
          </button>
        ) : null}
        <button variant="primary"> {page.toString()}</button>
        {page + 1 <= limit ? (
          <button
            onClick={() => {
              callback(page + 1);
            }}
            variant="light"
            className="rounded-0 btn-primary"
          >
            {"Next"}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default App;
