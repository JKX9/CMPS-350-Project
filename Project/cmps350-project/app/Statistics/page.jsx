'use client'
import styles from '../../moreCSS/stat.css'
import React, { useEffect } from 'react'
import { Chart } from 'react-google-charts'
import { useState } from 'react';
import {getTotalPriceWeek, getTopItems, getTopSpenders, getMostExpensiveItems, getMostQuantitySoldItems, mostQuantitySoldSellers as mqs} from '@/repo/stats-repo.js';

export default function page() {
  const id = 10;
  const type = "seller";

  const [topItems, setTopItems] = useState([]);
  const [totalPriceWeek, setTotalPriceWeek] = useState([]);
  const [topSpenders, setTopSpenders] = useState([]);
  const [mostExpensiveItems, setMostExpensiveItems] = useState([]);
  const [mostQuantitySoldItems, setMostQuantitySoldItems] = useState([]);
  const [mostQuantitySoldSellers, setMostQuantitySoldSellers] = useState([]);

  useEffect(() => {
    async function fetchData(id, type) {
      const topItemsFetch = await getTopItems();
      const totalPriceWeekFetch = await getTotalPriceWeek();
      const topSpendersFetch = await getTopSpenders();
      const mostExpensiveItemsFetch = await getMostExpensiveItems();
      const mostQuantitySoldItemsFetch = await getMostQuantitySoldItems();
      const mostQuantitySoldSellersFetch = await mqs();

      setTopItems(topItemsFetch);
      setTotalPriceWeek(totalPriceWeekFetch);
      setTopSpenders(topSpendersFetch);
      setMostExpensiveItems(mostExpensiveItemsFetch);
      setMostQuantitySoldItems(mostQuantitySoldItemsFetch);
      setMostQuantitySoldSellers(mostQuantitySoldSellersFetch);
    }

    fetchData(id, type);
  }, []);

  return (
    <>
      <h1>Statistics</h1>

      <div>
        <h1>Total price of items sold this week</h1>
        <p>{JSON.stringify(totalPriceWeek)}</p>
      </div>

      <div>
        <h1>Highest selling items</h1>
        <Chart  className='chart'
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Item ID", "Quantity Sold"],
            ...topItems.map((item) => [item.item_id, item.count]),
          ]}
          options={{
            title: "Top Items",
            chartArea: { width: "50%" },
            hAxis: {
              title: "Quantity Sold",
              minValue: 0,
            },
            vAxis: {
              title: "Item ID",
            },
          }}
          height="56.25vw"
          width="85%"
        ></Chart>
        {}
      </div>

      <div>
        <h1>Top spenders</h1>
        <Chart
          className='chart'
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Buyer ID", "Total Spent"],
            ...topSpenders.map((spender) => [spender.buyer_id, spender.total]),
          ]}
          options={{
            title: "Top Spenders",
            chartArea: { width: "50%" },
            hAxis: {
              title: "Total Spent",
              minValue: 0,
            },
            vAxis: {
              title: "Buyer ID",
            },
          }}
          height="56.25vw"
          width="85%"
        ></Chart>
      </div>

      <div>
        <h1>Most spent on items</h1>
        <Chart
          className='chart'
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Item ID", "Total Spent"],
            ...mostExpensiveItems.map((item) => [item.item_id, item.total]),
          ]}
          options={{
            title: "Most Expensive Items",
            chartArea: { width: "50%" },
            hAxis: {
              title: "Total Spent",
              minValue: 0,
            },
            vAxis: {
              title: "Item ID",
            },
          }}
          height="56.25vw"
          width="85%"
        ></Chart>
      </div>

      <div>
        <h1>Most quantity sold items</h1>
        <Chart
          className='chart'
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Item ID", "Quantity Sold"],
            ...mostQuantitySoldItems.map((item) => [
              item.item_id,
              item.quantity,
            ]),
          ]}
          options={{
            title: "Most Quantity Sold Items",
            chartArea: { width: "50%" },
            hAxis: {
              title: "Quantity Sold",
              minValue: 0,
            },
            vAxis: {
              title: "Item ID",
            },
          }}
          height="56.25vw"
          width="85%"
        ></Chart>

        <h1>Most quantity sold sellers</h1>
        <Chart
          className='chart'
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Seller ID", "Quantity Sold"],
            ...mostQuantitySoldSellers.map((seller) => [
              seller.seller_id,
              seller.quantity,
            ]),
          ]}
          options={{
            title: "Most Quantity Sold Sellers",
            chartArea: { width: "75%" },
            hAxis: {
              title: "Quantity Sold",
              minValue: 0,
            },
            vAxis: {
              title: "Seller ID",
            },
          }}
          width="85%"
          height="56.25vw"
        ></Chart>
      </div>
    </>
  );
}
