'use client'
import React, { useEffect } from 'react'
import { Chart } from 'react-google-charts'
import { useState } from 'react';
import { getTotalPriceWeek, getTopSellers, getTotalSpentWeek, getTopItems, getTopSellerItems, getLeastPopularItem } from '@/repo/stats-repo.js';

export default async function page() {
  const id = 10;
  const type = 'seller' 
  
  
  useEffect(() => {
    async function fetchData(id, type){
      const topItems = await getTopItems();
      const totalPriceWeek = await getTotalPriceWeek();
      if (type === "seller"){
          const topSellerItems = await getTopSellerItems(id);
          const leastPopularItem = await getLeastPopularItem(id);
          return {topItems, leastPopularItem, topSellerItems, totalPriceWeek, id};
      }
      if (type === "buyer"){
          const topSellers = await getTopSellers(id);
          const totalSpentWeek = await getTotalSpentWeek(id);
          return {topSellers, totalSpentWeek, topItems, totalPriceWeek, id};
      }
      return 'No account found';
    }

    fetchData(id, type).then((data) => {
      console.log(data);
    })
  }, [])


  return (
    <>
      <h1>Statistics</h1>

    </>
  )
}
