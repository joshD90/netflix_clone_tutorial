import React from "react";
import "./widgetLarge.css";

function WidgetLarge() {
  const Button = ({ type }) => {
    return <button className={"widgetLargeButton " + type}>{type}</button>;
  };

  return (
    <div className="widgetLarge">
      <h3 className="widgetLargeTitle">Latest Transactions</h3>
      <table className="widgetLargeTable">
        <tbody>
          <tr className="widgetLargeTr">
            <th className="widgetLargeTh">Customer</th>
            <th className="widgetLargeTh">Date</th>
            <th className="widgetLargeTh">Amount</th>
            <th className="widgetLargeTh">Status</th>
          </tr>
          <tr className="widgetLargeTr">
            <td className="widgetLargeUser">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                alt="User Profile Picture"
                className="widgetLargeImg"
              />
              <span className="widgetLargeName">Susan Carol</span>
            </td>
            <td className="widgetLargeDate">2 Jun 2021</td>
            <td className="widgetLargeAmount">$122.00</td>
            <td className="widgetLargeStatus">
              <Button type="Approved" />
            </td>
          </tr>
          <tr className="widgetLargeTr">
            <td className="widgetLargeUser">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                alt="User Profile Picture"
                className="widgetLargeImg"
              />
              <span className="widgetLargeName">Susan Carol</span>
            </td>
            <td className="widgetLargeDate">2 Jun 2021</td>
            <td className="widgetLargeAmount">$122.00</td>
            <td className="widgetLargeStatus">
              <Button type="Declined" />
            </td>
          </tr>
          <tr className="widgetLargeTr">
            <td className="widgetLargeUser">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                alt="User Profile Picture"
                className="widgetLargeImg"
              />
              <span className="widgetLargeName">Susan Carol</span>
            </td>
            <td className="widgetLargeDate">2 Jun 2021</td>
            <td className="widgetLargeAmount">$122.00</td>
            <td className="widgetLargeStatus">
              <Button type="Pending" />
            </td>
          </tr>
          <tr className="widgetLargeTr">
            <td className="widgetLargeUser">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                alt="User Profile Picture"
                className="widgetLargeImg"
              />
              <span className="widgetLargeName">Susan Carol</span>
            </td>
            <td className="widgetLargeDate">2 Jun 2021</td>
            <td className="widgetLargeAmount">$122.00</td>
            <td className="widgetLargeStatus">
              <Button type="Approved" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WidgetLarge;
