import axios from "axios";
//import Useeffect also
import React, { useEffect, useState } from "react";

//Dont need to import these seperately
//import { useState } from "react";

export default function PlayerItem() {
  const [data, setData] = useState([]);

  const details = [];
  async function gettingData() {
    //we don't need to put await and .then together.
    await axios
      .get(
        "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLu0W_9lII9aiL0kysYlfSOUgY5rNlOhUd&key=[myKey]"
      )
      .then((res) => {
        setData(res.data.items);
      });
  }

  //gettingData()  ****
  //if we put this into a useEffect then we can stop it re-firing on every render
  //at the end there is a an array of states / objects that when they are changed they
  //useeffect will refire.  If we leave this empty then it only fires on the page loading
  useEffect(() => {
    gettingData();
  }, []);

  data.forEach((element) => {
    details.push(element.snippet.title);
  });

  // console.log(details);
  return (
    <>
      {details.map((title, index) => (
        <div className="pl-item" key={index}>
          <strong>Video {index + 1}</strong> : {title}.
        </div>
      ))}
    </>
  );
}
