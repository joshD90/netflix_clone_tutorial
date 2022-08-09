import React, { useState, useEffect, useContext } from "react";
import "./listList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ListContext } from "../../context/listContext/ListContext";
import { getLists, deleteList } from "../../context/listContext/listApiCalls";

function ListList() {
  const [data, setData] = useState();
  const { lists, dispatch } = useContext(ListContext);

  useEffect(() => {
    getLists(dispatch);
    console.log("dispatchdependency has changed");
    console.log(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "title",
      headerName: "Title",
      width: 150,
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "type", headerName: "Type", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/lists/" + params.row._id} state={params.row}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  function handleDelete(id) {
    deleteList(id, dispatch);
    console.log(lists);
  }

  return (
    <div className="productList">
      {lists && (
        <DataGrid
          rows={lists}
          columns={columns}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          rowsPerPageOptions={[10]}
          getRowId={(r) => r._id}
        />
      )}
    </div>
  );
}

export default ListList;
