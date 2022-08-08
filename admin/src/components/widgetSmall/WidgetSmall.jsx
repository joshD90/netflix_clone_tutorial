import { Visibility } from "@mui/icons-material";
import React, { useState, useEffect, useContext } from "react";
import "./widgetSmall.css";
import axios from "axios";
import { AuthContext } from "../../context/authContext/AuthContext";

function WidgetSmall() {
  const [newUsers, setNewUsers] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(user);

  const headers = {
    headers: {
      token: `Bearer ${user.accessToken}`,
    },
  };

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/user?new=true", headers);
        console.log(res.data);
        setNewUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNewUsers();
  }, []);
  return (
    <div className="widgetSmall">
      <span className="widgetSmallTitle">Newly Joined Members</span>
      <ul className="widgetSmallList">
        {newUsers &&
          newUsers.map((user, index) => {
            return (
              <li className="widgetSmallListItem" key={index}>
                <img
                  src={
                    user.profilePic ||
                    "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
                  }
                  alt="list user profile"
                  className="widgetSmallImg"
                />
                <div className="widgetSmallUser">
                  <span className="widgetSmallUserName">{user.username}</span>
                </div>
                <button className="widgetSmallButton">
                  <Visibility className="widgetSmallIcon" />
                  Display
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default WidgetSmall;
