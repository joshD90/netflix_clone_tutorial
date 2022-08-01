import React, { useState, useEffect, useMemo } from "react";
import "./home.css";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
import { userData } from "../../dummyData";
import WidgetSmall from "../../components/widgetSmall/WidgetSmall";
import WidgetLarge from "../../components/widgetLarge/WidgetLarge";
import axios from "axios";

function Home() {
  const [userStats, setUserStats] = useState([]);
  const MONTHS = useMemo(() => {
    return [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  }, []);

  const headers = {
    headers: {
      token:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTEyNGIzMTA2MzM3NzMwMjI4NDYzMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTEzNjc3NSwiZXhwIjoxNjU5NTY4Nzc1fQ.5gQlhJo7gL92PJpeW63nN76C780GwFcPhtGloE2OXWA",
    },
  };
  useEffect(() => {
    const getStats = async () => {
      try {
        const result = await axios.get("/user/stats");

        result.data.sort((a, b) => {
          return a._id - b._id;
        });

        result.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);

  const revenueInfo = {
    title: "Revenue",
    firstFigure: 2140,
    secondFigure: -10,
  };
  const cost = { title: "Cost", firstFigure: 2275, secondFigure: 440 };

  return (
    <div className="home">
      <div className="featured">
        <FeaturedInfo content={revenueInfo} />
        <FeaturedInfo content={cost} />
        <FeaturedInfo content={cost} />
      </div>
      <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSmall />
        <WidgetLarge />
      </div>
    </div>
  );
}

export default Home;
