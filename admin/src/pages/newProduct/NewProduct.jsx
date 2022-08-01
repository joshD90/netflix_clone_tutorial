import React from "react";
import "./newProduct.css";

function newProduct() {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form action="" className="addProductForm">
        <div className="addProductItem">
          <label htmlFor="file">Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label htmlFor="">Name</label>
          <input type="text" palceholder="Apple Airpods" />
        </div>
        <div className="addProductItem">
          <label htmlFor="">Stock</label>
          <input type="text" palceholder="123" />
        </div>
        <div className="addProductItem">
          <label htmlFor="">Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}

export default newProduct;
