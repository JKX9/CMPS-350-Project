'use client'
import React, { useEffect } from 'react'
import { Chart } from 'react-google-charts'
import { useState } from 'react';
import { getTotalPriceWeek, getTopSellers, getTotalSpentWeek, getTopItems, getTopSellerItems, getLeastPopularItem } from '@/repo/stats-repo.js';

export default async function page() {
  const id = 10;
  const type = 'seller' 
  const [isVisible, setIsVisible] = useState(true);
  const [topItems, setTopItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const returned = await getTopItems();
            console.log("in try", returned);
            const data = await returned.map(item => [
                parseInt(item.item_id),
                parseInt(item.count)
            ]);
            console.log(data);
            setTopItems(data);
        } catch (error) {
          console.log("in catch");
            console.error('Error fetching data:', error);
        }
    };

    fetchData(); 
}, []);

  return (
    <>
      <h1>Statistics</h1>
      {topItems.map((item, index) => (
        <div key={index}>
          <p>Item ID: {item[0]}</p>
          <p>Count: {item[1]}</p>
        </div>
      ))}
    </>
  )
}
