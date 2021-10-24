import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./TotalStats.css";

export default function TotalStats() {
  //updatedAt
  const [updated, setUpdated] = useState("");
  const [countryCase, setCountryCase] = useState("");
  const [countryDeath, setCountryDeath] = useState("");
  const [countryRecovered, setCountryRecovered] = useState("");

  useEffect(() => {
    getCountryCases();
  }, []);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  async function getCountryCases() {
    const data = await api.get("https://covid19-brazil-api.now.sh/api/report/v1/brazil");
    const cases = data.data.data.confirmed;
    const deaths = data.data.data.deaths;
    const updatedAt = data.data.data.updated_at;
    const recovered = data.data.data.recovered;
    let d = new Date(updatedAt);
    let up =
      d.getDate() +
      "/" +
      (d.getMonth() + 1) +
      "/" +
      d.getFullYear() +
      " - " +
      d.getHours() +
      "h";

    setCountryCase(numberWithCommas(cases));
    setCountryDeath(numberWithCommas(deaths));
    setCountryRecovered(numberWithCommas(recovered));
    setUpdated(up);
  }

  return (
    <>
      <div className="updated">
        <p className="updateFont">Última atualização</p>
        <p>
          <strong className="">{updated}</strong>
        </p>
      </div>
      <div className="cont">
        <div className="box">
          <p className="containerFont">Casos Confirmados</p>
          <p>
            <strong className="strongCase">{countryCase}</strong>
          </p>
        </div>
        <div className="box">
          <p className="containerFont">Total de Óbitos</p>
          <p>
            <strong className="strongDeath">{countryDeath}</strong>
          </p>
        </div>
        <div className="box">
          <p className="containerFont">Total de Recuperados</p>
          <p>
            <strong className="strongLetal">{countryRecovered}</strong>
          </p>
        </div>
      </div>
    </>
  );
}
