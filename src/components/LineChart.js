import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import api from "../services/api";
import Select from "react-select";
import uf from "../utils/uf";
import "./LineChart.css";

export default function Chart() {
  const [chartData, setCharData] = useState({});
  const [isBusy, setBusy] = useState(true);

  //UF
  const [value, setValue] = useState({
    label: "Rio Grande do Sul",
    value: "RS",
  });

  //updatedAt

  useEffect(() => {
    getChartData(value);
  }, [value]);

  function formatDate(date) {
    let year = date.getFullYear();
    let month = "";
    let day = "";

    if (date.getMonth() < 10) {
      month = "0" + (date.getMonth() + 1);
    } else {
      month = date.getMonth() + 1;
    }
    if (date.getDate() < 10) {
      day = "0" + date.getDate();
    } else {
      day = date.getDate();
    }

    return year + '-' + month + '-' + day;
  }


  async function getData(state) {
    const lastDataSource = await (
      await api.get(`https://brasil.io/api/dataset/covid19/caso/data?is_last=True&place_type=state&state=${state}`, {
        method: 'get',
        headers: {
          Authorization: `Token c0f520e06c202f5a9fe068c94c8faaee9ecd9c46`,
        },
      }
      )
    ).data.results[0];
    const dataSource = await (
      await api.get(`https://brasil.io/api/dataset/covid19/caso/data?is_last=False&place_type=state&state=${state}`,{
        method: 'get',
        headers: {
          Authorization: `Token c0f520e06c202f5a9fe068c94c8faaee9ecd9c46`,
        },
      }
      )
    ).data.results;

    dataSource.unshift(lastDataSource);

    let casesByDateRaw = [];
    let casesByDate = [];

    if (dataSource.length > 43) {
      Object.entries(dataSource).map(pos => {
        casesByDateRaw.push({
          confirmed: pos[1].confirmed,
          date: pos[1].date,
          death_rate: pos[1].death_rate,
          deaths: pos[1].deaths,
        })
        casesByDateRaw.estimated = pos[1].estimated_population_2019;
        casesByDateRaw.state = pos[1].state;
      })


      for (let i = 0; i < 43; i += 7) {
        casesByDate.push(casesByDateRaw[i])
      }

      casesByDate.estimated = casesByDateRaw.estimated;
      casesByDate.state = casesByDateRaw.state;

    }
    else if (dataSource.length > 36) {
      Object.entries(dataSource).map(pos => {
        casesByDateRaw.push({
          confirmed: pos[1].confirmed,
          date: pos[1].date,
          death_rate: pos[1].death_rate,
          deaths: pos[1].deaths,
        })
        casesByDateRaw.estimated = pos[1].estimated_population_2019;
        casesByDateRaw.state = pos[1].state;
      })

      for (let i = 0; i < 36; i += 7) {
        casesByDate.push(casesByDateRaw[i])
      }

      let auxDate6 = new Date(casesByDate[casesByDate.length - 1].date);
      auxDate6.setDate(auxDate6.getDate() - 6)

      casesByDate.push({
        confirmed: 0,
        date: formatDate(auxDate6),
        death_rate: 0,
        deaths: 0,
      })

      casesByDate.estimated = casesByDateRaw.estimated;
      casesByDate.state = casesByDateRaw.state;

    } else if (dataSource.length > 29) {
      Object.entries(dataSource).map(pos => {
        casesByDateRaw.push({
          confirmed: pos[1].confirmed,
          date: pos[1].date,
          death_rate: pos[1].death_rate,
          deaths: pos[1].deaths,
        })
        casesByDateRaw.estimated = pos[1].estimated_population_2019;
        casesByDateRaw.state = pos[1].state;
      })

      for (let i = 0; i < 29; i += 7) {
        casesByDate.push(casesByDateRaw[i])
      }

      let auxDate6 = new Date(casesByDate[casesByDate.length - 1].date);
      auxDate6.setDate(auxDate6.getDate() - 6)

      let auxDate5 = new Date(auxDate6);
      auxDate5.setDate(auxDate5.getDate() - 6)

      casesByDate.push({
        confirmed: 0,
        date: formatDate(auxDate6),
        death_rate: 0,
        deaths: 0,
      })

      casesByDate.push({
        confirmed: 0,
        date: formatDate(auxDate5),
        death_rate: 0,
        deaths: 0,
      })

      casesByDate.estimated = casesByDateRaw.estimated;
      casesByDate.state = casesByDateRaw.state;

    } else if (dataSource.length > 22) {
      Object.entries(dataSource).map(pos => {
        casesByDateRaw.push({
          confirmed: pos[1].confirmed,
          date: pos[1].date,
          death_rate: pos[1].death_rate,
          deaths: pos[1].deaths,
        })
        casesByDateRaw.estimated = pos[1].estimated_population_2019;
        casesByDateRaw.state = pos[1].state;
      })

      for (let i = 0; i < 22; i += 7) {
        casesByDate.push(casesByDateRaw[i])
      }

      let auxDate6 = new Date(casesByDate[casesByDate.length - 1].date);
      auxDate6.setDate(auxDate6.getDate() - 6)

      let auxDate5 = new Date(auxDate6);
      auxDate5.setDate(auxDate5.getDate() - 6)

      let auxDate4 = new Date(auxDate5);
      auxDate4.setDate(auxDate4.getDate() - 6)

      casesByDate.push({
        confirmed: 0,
        date: formatDate(auxDate6),
        death_rate: 0,
        deaths: 0,
      })

      casesByDate.push({
        confirmed: 0,
        date: formatDate(auxDate5),
        death_rate: 0,
        deaths: 0,
      })

      casesByDate.push({
        confirmed: 0,
        date: formatDate(auxDate4),
        death_rate: 0,
        deaths: 0,
      })

      casesByDate.estimated = casesByDateRaw.estimated;
      casesByDate.state = casesByDateRaw.state;

    } else if (dataSource.length > 15) {
      Object.entries(dataSource).map(pos => {
        casesByDateRaw.push({
          confirmed: pos[1].confirmed,
          date: pos[1].date,
          death_rate: pos[1].death_rate,
          deaths: pos[1].deaths,
        })
        casesByDateRaw.estimated = pos[1].estimated_population_2019;
        casesByDateRaw.state = pos[1].state;
      })

      for (let i = 0; i < 15; i += 7) {
        casesByDate.push(casesByDateRaw[i])
      }

      let auxDate6 = new Date(casesByDate[casesByDate.length - 1].date);
      auxDate6.setDate(auxDate6.getDate() - 6)

      let auxDate5 = new Date(auxDate6);
      auxDate5.setDate(auxDate5.getDate() - 6)

      let auxDate4 = new Date(auxDate5);
      auxDate4.setDate(auxDate4.getDate() - 6)

      let auxDate3 = new Date(auxDate4);
      auxDate3.setDate(auxDate3.getDate() - 6)

      casesByDate.push({
        confirmed: 0,
        date: formatDate(auxDate6),
        death_rate: 0,
        deaths: 0,
      })

      casesByDate.push({
        confirmed: 0,
        date: formatDate(auxDate5),
        death_rate: 0,
        deaths: 0,
      })

      casesByDate.push({
        confirmed: 0,
        date: formatDate(auxDate4),
        death_rate: 0,
        deaths: 0,
      })

      casesByDate.push({
        confirmed: 0,
        date: formatDate(auxDate3),
        death_rate: 0,
        deaths: 0,
      })

      casesByDate.estimated = casesByDateRaw.estimated;
      casesByDate.state = casesByDateRaw.state;

    } else if (dataSource.length > 8) {
      Object.entries(dataSource).map(pos => {
        casesByDateRaw.push({
          confirmed: pos[1].confirmed,
          date: pos[1].date,
          death_rate: pos[1].death_rate,
          deaths: pos[1].deaths,
        })
        casesByDateRaw.estimated = pos[1].estimated_population_2019;
        casesByDateRaw.state = pos[1].state;
      })

      for (let i = 0; i < 15; i += 7) {
        casesByDate.push(casesByDateRaw[i])
      }

      let auxDate6 = new Date(casesByDate[casesByDate.length - 1].date);
      auxDate6.setDate(auxDate6.getDate() - 6)

      let auxDate5 = new Date(auxDate6);
      auxDate5.setDate(auxDate5.getDate() - 6)

      let auxDate4 = new Date(auxDate5);
      auxDate4.setDate(auxDate4.getDate() - 6)

      let auxDate3 = new Date(auxDate4);
      auxDate3.setDate(auxDate3.getDate() - 6)

      let auxDate2 = new Date(auxDate3);
      auxDate2.setDate(auxDate2.getDate() - 6)


      casesByDate.push({
        confirmed: 0,
        date: formatDate(auxDate6),
        death_rate: 0,
        deaths: 0,
      })

      casesByDate.push({
        confirmed: 0,
        date: formatDate(auxDate5),
        death_rate: 0,
        deaths: 0,
      })

      casesByDate.push({
        confirmed: 0,
        date: formatDate(auxDate4),
        death_rate: 0,
        deaths: 0,
      })

      casesByDate.push({
        confirmed: 0,
        date: formatDate(auxDate3),
        death_rate: 0,
        deaths: 0,
      })

      casesByDate.push({
        confirmed: 0,
        date: formatDate(auxDate2),
        death_rate: 0,
        deaths: 0,
      })

      casesByDate.estimated = casesByDateRaw.estimated;
      casesByDate.state = casesByDateRaw.state;

    } else {
      console.log("dados insuficientes")
    }


    let week1 = casesByDate[5].confirmed - casesByDate[6].confirmed;

    let week2 = casesByDate[4].confirmed - casesByDate[5].confirmed;

    let week3 = casesByDate[3].confirmed - casesByDate[4].confirmed;

    let week4 = casesByDate[2].confirmed - casesByDate[3].confirmed;

    let week5 = casesByDate[1].confirmed - casesByDate[2].confirmed;

    let week6 = casesByDate[0].confirmed - casesByDate[1].confirmed;


    const obj = {
      week1: {
        cases: week1,
        date: casesByDate[5].date,
      },
      week2: {
        cases: week2,
        date: casesByDate[4].date,
      },
      week3: {
        cases: week3,
        date: casesByDate[3].date,
      },
      week4: {
        cases: week4,
        date: casesByDate[2].date,
      },
      week5: {
        cases: week5,
        date: casesByDate[1].date,
      },
      week6: {
        cases: week6,
        date: casesByDate[0].date,
      },
    };
    return obj;
  }


  async function getChartData(state) {
    setBusy(true);
    const obj = await getData(state.value);
    console.log(obj);

    setCharData({
      labels: [
        `${obj.week1.date.substring(8, 10)}/${obj.week1.date.substring(5, 7)}`,
        `${obj.week2.date.substring(8, 10)}/${obj.week2.date.substring(5, 7)}`,
        `${obj.week3.date.substring(8, 10)}/${obj.week3.date.substring(5, 7)}`,
        `${obj.week4.date.substring(8, 10)}/${obj.week4.date.substring(5, 7)}`,
        `${obj.week5.date.substring(8, 10)}/${obj.week5.date.substring(5, 7)}`,
        `${obj.week6.date.substring(8, 10)}/${obj.week6.date.substring(5, 7)}`,
      ],
      datasets: [
        {
          label: "Aumento de casos por semana",
          data: [
            obj.week1.cases,
            obj.week2.cases,
            obj.week3.cases,
            obj.week4.cases,
            obj.week5.cases,
            obj.week6.cases,
          ],
          borderColor: "#6370ff",
          backgroundColor: "rgba(99, 112, 255, 0.3)",
          pointBackgroundColor: "#6370ff",
          pointRadius: 4,
          pointHoverRadius: 8,
          pointHoverBorderColor: "rgba(121, 209, 255, 0.9)",
        },
      ],
    });
    setBusy(false);
  }

  function handleChange(selectedOption) {
    setValue(selectedOption);
  }

  return (
    <div className="chart">
      <p className="title">{`Aumento de casos no estado ${
        value ? value.value : "RS"
        }`}</p>
      <div className="select">
        <Select
          value={value}
          onChange={(selected) => handleChange(selected)}
          options={uf}
          placeholder="Selecione um Estado"
          className="select"
        />
      </div>

      {isBusy ? (
        // <Line
        //   height={100}
        //   data={chartData}
        //   options={{
        //     legend: {
        //       display: true,
        //       position: "bottom",
        //     },
        //     maintainAspectRatio: true,
        //   }}
        // />
        <p className="p" >Carregando..</p>
      ) : (
          <Line
            height={100}
            data={chartData}
            options={{
              legend: {
                display: true,
                position: "bottom",
              },
              maintainAspectRatio: true,
            }}
          />
        )}
    </div>
  );
}
