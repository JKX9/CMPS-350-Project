'use client'
import React from 'react'
import { Chart } from 'react-google-charts'
import { useState } from 'react';
import { getTotalPriceWeek, getTopSellers, getTotalSpentWeek, getTopItems, getTopSellerItems, getLeastPopularItem } from '@/repo/stats-repo.js';

export default function page() {
  const id = 10;
  const type = 'seller' // Destructuring props
  const [isVisible, setIsVisible] = useState(true);
  const returned = getTopItems();

  return (
    <>
      <h1>Statistics</h1>

      <div className="universalCharts">
        Universal charts

        {/* display the result of the getTopItems function that is imported */}

        <Chart
          chartType="ScatterChart"
          data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
          width="100%"
          height="400px"
          legendToggle
        />
      </div>

      {/* Conditionally render the buyerCharts div based on type */}
      {type === 'buyer' && (
        <div className='buyerCharts'>
          Buyer charts
        </div>
      )}

      {/* Conditionally render the sellerCharts div based on type */}
      {type === 'seller' && (
        <div className='sellerCharts'>
          Seller charts
        </div>
      )}
    </>
  )
}
