import React, { useState, useEffect, useContext } from "react";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import { AuthContext } from "../../context/authContext/AuthContext";
import axios from "axios";

export default function Home({ type }) {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const { user } = useContext(AuthContext);
  console.log(user, "homepage user");
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `/list/${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token: `Bearer ${user.accessToken}`,
            },
          }
        );

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
