import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./RankingList.css";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";

export default function RankingList() {
  const [rankingListData, setRankingListData] = useState([]);

  useEffect(() => {
    getRankingListData();
  }, []);

  function _getLethality(uf) {
    return parseFloat(((uf.deaths * 100) / uf.cases).toFixed(2));
  }

  async function getRankingListData() {
    let data = await (
      await api.get("https://covid19-brazil-api.now.sh/api/report/v1")
    ).data.data;
    data = data.map((e) => {
      const newItem = {};
      newItem.uid = e.uid++;
      newItem.state = e.state;
      newItem.cases = e.cases;
      newItem.deaths = e.deaths;
      newItem.lethality = _getLethality(e);
      return newItem;
    });
    setRankingListData(data);
  }

  function sortList(order, attr) {
    let sorted = rankingListData
      .sort((a, b) => _sortHelper(a, b, order, attr))
      .map((e) => {
        const newItem = {};
        newItem.uid = e.uid++;
        newItem.state = e.state;
        newItem.cases = e.cases;
        newItem.deaths = e.deaths;
        newItem.lethality = e.lethality;
        return newItem;
      });
    setRankingListData(sorted);
  }

  function _sortHelper(a, b, order, attr) {
    if (attr === "lethality") {
      const lethA = a.lethality;
      const lethB = b.lethality;
      if (order === "asc") {
        if (lethA > lethB) return 1;
        else if (lethA < lethB) return -1;
        else return 0;
      } else if (order === "desc") {
        if (lethA < lethB) return 1;
        else if (lethA > lethB) return -1;
        else return 0;
      }
    } else {
      if (order === "asc") {
        if (a[attr] > b[attr]) return 1;
        else if (a[attr] < b[attr]) return -1;
        else return 0;
      } else if (order === "desc") {
        if (a[attr] < b[attr]) return 1;
        else if (a[attr] > b[attr]) return -1;
        else return 0;
      }
    }
  }

  return (
    <div className="c">
      <div className="blueTable">
        <table>
          <thead className="head">
            <tr>
              <th>
                Estado
                <div className="sort-controls">
                  <div
                    onClick={() => sortList("asc", "state")}
                    className="text-asc"
                  >
                    <IoMdArrowRoundUp />
                  </div>
                  |
                  <div
                    onClick={() => sortList("desc", "state")}
                    className="text-desc"
                  >
                    <IoMdArrowRoundDown />
                  </div>
                </div>
              </th>
              <th>
                Casos
                <div className="sort-controls">
                  <div
                    onClick={() => sortList("asc", "cases")}
                    className="text-asc"
                  >
                    <IoMdArrowRoundUp />
                  </div>
                  |
                  <div
                    onClick={() => sortList("desc", "cases")}
                    className="text-desc"
                  >
                    <IoMdArrowRoundDown />
                  </div>
                </div>
              </th>
              <th>
                Óbitos
                <div className="sort-controls">
                  <div
                    onClick={() => sortList("asc", "deaths")}
                    className="text-asc"
                  >
                    <IoMdArrowRoundUp />
                  </div>
                  |
                  <div
                    onClick={() => sortList("desc", "deaths")}
                    className="text-desc"
                  >
                    <IoMdArrowRoundDown />
                  </div>
                </div>
              </th>
              <th>
                Letalidade
                <div className="sort-controls">
                  <div
                    onClick={() => sortList("asc", "lethality")}
                    className="text-asc"
                  >
                    <IoMdArrowRoundUp />
                  </div>
                  |
                  <div
                    onClick={() => sortList("desc", "lethality")}
                    className="text-desc"
                  >
                    <IoMdArrowRoundDown />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          {rankingListData.map((uf) => {
            return (
              <tbody key={uf.uid}>
                <tr>
                  <td>
                    <strong>{uf.state}</strong>
                  </td>
                  <td>{uf.cases}</td>
                  <td>{uf.deaths}</td>
                  <td>{uf.lethality}%</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
