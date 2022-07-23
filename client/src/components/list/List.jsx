import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";
import React, { useRef, useState, useEffect } from "react";
import "./list.scss";
import ListItem from "../listItem/ListItem";

function List() {
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
      <span className="listTitle">Continue Watching</span>
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
          <ListItem index={0} />
          <ListItem index={1} />
          <ListItem index={2} />
          <ListItem index={3} />
          <ListItem index={4} />
          <ListItem index={5} />
          <ListItem index={6} />
          <ListItem index={7} />
          <ListItem index={8} />
          <ListItem index={9} />
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
