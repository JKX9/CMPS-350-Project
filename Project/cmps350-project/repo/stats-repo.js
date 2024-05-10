'use server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getTotalPriceWeek(){
    try {
        const total = await prisma.transactions.aggregate({
          _sum: { total: true },
        });
        return total._sum.total;
      } catch (err) {
        console.log(err);
      }
}

async function getTopItems(){
    try {
        const transactions = await prisma.transactions.findMany({
          select: { item_id: true },
        });
      
        const itemCounts = transactions.reduce((counts, transaction) => {
          counts[transaction.item_id] = (counts[transaction.item_id] || 0) + 1;
          return counts;
        }, {});
      
        const topItems = Object.entries(itemCounts)
          .sort((a, b) => b[1] - a[1]) // Sort items based on count in descending order
          .slice(0, 3) // Select the top 3 items
          .map(([item_id, count]) => ({ item_id: parseInt(item_id), count }));
      
        return topItems;
      } catch (err) {
        console.log(err);
      }      
}

//write a function that returns the highest Spending buyers

async function getTopSpenders(){
    try{
        const transactions = await prisma.transactions.findMany({
            select: {buyer_id: true, total: true},
        });

        const buyerTotals = transactions.reduce((totals, transaction) => {
            totals[transaction.buyer_id] = (totals[transaction.buyer_id] || 0) + transaction.total;
            return totals;
        }, {});

        const topSpenders = Object.entries(buyerTotals)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([buyer_id, total]) => ({buyer_id: parseInt(buyer_id), total}));

        return topSpenders;
    }
    catch(err){
        console.log(err);
    }
}

async function getMostExpensiveItems(){
    try{
        const transactions = await prisma.transactions.findMany({
            select: {item_id: true, total: true},
        });

        const itemTotals = transactions.reduce((totals, transaction) => {
            totals[transaction.item_id] = (totals[transaction.item_id] || 0) + transaction.total;
            return totals;
        }, {});

        const mostExpensiveItems = Object.entries(itemTotals)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([item_id, total]) => ({item_id: parseInt(item_id), total}));

        return mostExpensiveItems;
    }
    catch(err){
        console.log(err);
    }
}

async function getMostQuantitySoldItems(){
    try{
        const transactions = await prisma.transactions.findMany({
            select: {item_id: true, quantity: true},
        });

        const itemQuantities = transactions.reduce((quantities, transaction) => {
            quantities[transaction.item_id] = (quantities[transaction.item_id] || 0) + transaction.quantity;
            return quantities;
        }, {});

        const mostQuantitySoldItems = Object.entries(itemQuantities)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([item_id, quantity]) => ({item_id: parseInt(item_id), quantity}));

        return mostQuantitySoldItems;
    }
    catch(err){
        console.log(err);
    }
}

async function mostQuantitySoldSellers(){
    try{
        const transactions = await prisma.transactions.findMany({
            select: {seller_id: true, quantity: true},
        });

        const sellerQuantities = transactions.reduce((quantities, transaction) => {
            quantities[transaction.seller_id] = (quantities[transaction.seller_id] || 0) + transaction.quantity;
            return quantities;
        }, {});

        const mostQuantitySoldSellers = Object.entries(sellerQuantities)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([seller_id, quantity]) => ({seller_id: parseInt(seller_id), quantity}));

        return mostQuantitySoldSellers;
    }
    catch(err){
        console.log(err);
    }
}







export {getTotalPriceWeek, getTopItems, getTopSpenders, getMostExpensiveItems, getMostQuantitySoldItems, mostQuantitySoldSellers};