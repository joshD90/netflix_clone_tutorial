import React, { useState, useEffect } from "react";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import axios from "axios";

export default function Home({ type }) {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `/list/${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGU3YzgyOWUxOTAwNDE1NDg0NjE4MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1ODc2MzA2NCwiZXhwIjoxNjU5MTk1MDY0fQ.QgaJqnK8APgYCL6TZj0HlC8cfDrJfVr6d39a99w84AM",
            },
          }
        );
        console.log(res.data);
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomLists();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists && lists.map((list, index) => <List list={list} key={index} />)}
    </div>
  );
}
