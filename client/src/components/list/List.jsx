import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import React, { useRef, useState, useEffect } from "react";
import "./list.scss";
import ListItem from "../listItem/ListItem";

function List({ list }) {
  const listRef = useRef("listRef");
  const [slideNumber, setSlideNumber] = useState(0);
  const [isTransitionEnded, setIsTransitionEnded] = useState(true);

  useEffect(() => {
    listRef.current.addEventListener("transitionend", () => {
      setIsTransitionEnded(true);
    });
  }, []);

  function slide(direction) {
    if (!isTransitionEnded) return;

    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSlideNumber(slideNumber - 1);
      setIsTransitionEnded(false);
    } else if (direction === "right" && slideNumber < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSlideNumber(slideNumber + 1);
      setIsTransitionEnded(false);
    }
  }

  return (
    <div className="list">
      <span className="listTitle">{list && list.title}</span>
      <div className="wrapper">
        {slideNumber > 0 && (
          <ArrowBackIosOutlined
            className="sliderArrow left"
            onClick={() => {
              slide("left");
            }}
          />
        )}
        <div className="container" ref={listRef}>
          {list.content.map((item, index) => {
            return <ListItem index={index} key={index} item={item} />;
          })}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => {
            slide("right");
          }}
        />
      </div>
    </div>
  );
}

export default List;
