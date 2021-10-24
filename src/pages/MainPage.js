import React, { useState, useEffect } from "react";
import LineChart from "../components/LineChart";
import DoughnutChart from "../components/DoughnutChart";
import TotalStats from "../components/TotalStats";
import RankingList from "../components/RankingList";
import ListTweets from "../components/ListTweets";
import MiddleList from "../components/MiddleList";
import "./MainPage.css";
import api from "../services/api";

export default function MainPage() {
  //Doughnut
  const [loadingDoughnut, setLoadingDoughnut] = useState(true);
  const [doughnutData, setDoughnutData] = useState({});

  useEffect(() => {
    chartDoughnut();
  }, []);

  async function getDoughnutData() {
    const data = await api.get(
      "https://covid19-brazil-api.now.sh/api/report/v1/brazil"
    );

    const obj = {
      cases: data.data.data.cases,
      deaths: data.data.data.deaths,
      recovers: data.data.data.recovered,
      total: data.data.data.confirmed,
    };
    return obj;
  }

  async function chartDoughnut() {
    const obj = await getDoughnutData();

    setDoughnutData({
      labels: [`Recuperados`, `Casos Ativos`, `Óbitos`],
      datasets: [
        {
          label: "Casos",
          data: [obj.recovers, obj.cases, obj.deaths],
          backgroundColor: ["rgba(92, 188, 124, 0.9)", "rgba(99, 112, 255, 0.8)", "rgba(255, 87, 77, 0.9)"],
        },
      ],
    });
    setLoadingDoughnut(false);
  }

  return (
    <div className="MainPage">
      <header>Coronavírus</header>
      <TotalStats />
      <LineChart />
      <div className="contMiddle">
        <div className="boxChart">
          {loadingDoughnut ? (
            <p>Loading</p>
          ) : (
            <DoughnutChart chartData={doughnutData} legendPosition="bottom" />
          )}
        </div>
          <MiddleList />
        <div className="box">
          <ListTweets />
        </div>
      </div>
        <RankingList />
    </div>
  );
}
