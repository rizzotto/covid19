import React, { useState, useEffect } from "react";
import "./MiddleList.css";
import api from "../services/api";

export default function MiddleList() {
  const [deaths, setDeaths] = useState("");
  const [confirmed, setConfirmed] = useState("");

  useEffect(() => {
    getMiddleListData();
  });

  function getLetality() {
    return `${((deaths * 100) / confirmed).toFixed(2)}%`;
  }

  async function getMiddleListData() {
    const data = await (
      await api.get("https://covid19-brazil-api.now.sh/api/report/v1/brazil")
    ).data.data;

    setDeaths(data.deaths);
    setConfirmed(data.confirmed);
  }

  return (
    <div className="box">
      <div className ="boxMiddleList">
        <p className="letTitle">Letalidade</p>
        <p className="content">{getLetality()}</p>
      </div>
      <div className="boxMiddleList">
        <p className="letTitle">valor</p>
        <p className="content">v</p>
      </div>
      <div className="boxMiddleList">
        <p className="letTitle">valor</p>
        <p className="content">v</p>
      </div>
    </div>
  );
}
