'use client'
import React, { useEffect } from 'react'
import { Chart } from 'react-google-charts'
import { useState } from 'react';
import {getTotalPriceWeek, getTopItems, getTopSpenders, getMostExpensiveItems, getMostQuantitySoldItems, mostQuantitySoldSellers} from '@/repo/stats-repo.js';

export default function page() {
  const id = 10;
  const type = 'seller'

  const [topItems, setTopItems] = useState([]);
  const [totalPriceWeek, setTotalPriceWeek] = useState([]);
  const [topSpenders, setTopSpenders] = useState([]);
  const [mostExpensiveItems, setMostExpensiveItems] = useState([]);
  const [mostQuantitySoldItems, setMostQuantitySoldItems] = useState([]);
  const [mostQuantitySoldSellers, setMostQuantitySoldSellers] = useState([]);

  useEffect(() => {
    async function fetchData(id, type){
      const topItems = await getTopItems();
      const totalPriceWeek = await getTotalPriceWeek();
      const topSpenders = await getTopSpenders();
      const mostExpensiveItems = await getMostExpensiveItems();
      const mostQuantitySoldItems = await getMostQuantitySoldItems();
      const mostQuantitySoldSellers = await mostQuantitySoldSellers();


      setTopItems(topItems);
      setTotalPriceWeek(totalPriceWeek);
      setTopSpenders(topSpenders);
      setMostExpensiveItems(mostExpensiveItems);
      setMostQuantitySoldItems(mostQuantitySoldItems);
      setMostQuantitySoldSellers(mostQuantitySoldSellers);

    }

    fetchData(id, type)
  }, [])


  return (
    <>
      <h1>Statistics</h1>
      <div>
        <h1>Highest selling items</h1>
        {
          topItems.map((item) => 
          <div key={item.item_id}>
            <p>Item ID: {item.item_id}</p>
            <p>Count: {item.count}</p>
          </div>
        )
      }</div>

      <div>
        <h1>Total price of items sold this week</h1>
        <p>{JSON.stringify(totalPriceWeek)}</p>
      </div>

      <div>
        <h1>Top spenders</h1>
        {
          topSpenders.map((spender) => 
          <div key={spender.buyer_id}>
            <p>Buyer ID: {spender.buyer_id}</p>
            <p>Total spent: {spender.total_spent}</p>
          </div>
        )
      }</div>

      <div>
        <h1>Most expensive items</h1>
        {
          mostExpensiveItems.map((item) => 
          <div key={item.item_id}>
            <p>Item ID: {item.item_id}</p>
            <p>Total spent: {item.total}</p>
          </div>
        )
      }</div>

      <div>
        <h1>Most quantity sold items</h1>
        {
          mostQuantitySoldItems.map((item) => 
          <div key={item.item_id}>
            <p>Item ID: {item.item_id}</p>
            <p>Total quantity sold: {item.total}</p>
          </div>
        )
      }</div>

      <div>
        <h1>Most quantity sold sellers</h1>
        {
          mostQuantitySoldSellers.map((seller) => 
          <div key={seller.seller_id}>
            <p>Seller ID: {seller.seller_id}</p>
            <p>Total quantity sold: {seller.total}</p>
          </div>
        )
      }</div>
    </>
  )
}
