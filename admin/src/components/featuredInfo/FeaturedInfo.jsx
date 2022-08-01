import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import React from "react";
import "./featuredInfo.css";

function FeaturedInfo({ content }) {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">{content.title}</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{"$" + content.firstFigure}</span>
          <span className="featuredMoney">
            {content.secondFigure > 0
              ? "  +" + content.secondFigure
              : content.secondFigure}
            {content.secondFigure > 0 ? <ArrowUpward /> : <ArrowDownward />}
          </span>
        </div>
        <span className="featuredSub">Compared to last Month</span>
      </div>
    </div>
  );
}

export default FeaturedInfo;
