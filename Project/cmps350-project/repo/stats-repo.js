'use server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getTotalPriceWeek(){
    try{
        return await prisma.$queryRaw`SELECT SUM(total) as total FROM transactions;`;
    }
    catch(err){
        console.log(err);
    }
}

async function getTopSellers(buyerId){
    try{
        return await prisma.$queryRaw`SELECT seller_id, COUNT(seller_id) as count FROM transactions WHERE buyer_id = ${buyerId} GROUP BY seller_id ORDER BY count DESC LIMIT 3;`;
    }
    catch(err){
        console.log(err);
    }
}

async function getTotalSpentWeek(buyerId){
    try{
        return await prisma.$queryRaw`SELECT SUM(total) as total FROM transactions WHERE buyer_id = ${buyerId} AND date > DATE_SUB(NOW(), INTERVAL 1 WEEK);`;
    }
    catch(err){
        console.log(err);
    }
}

async function getTopItems(){
    try{
        const res =  await prisma.$queryRaw`SELECT item_id, COUNT(item_id) as count FROM transactions GROUP BY item_id ORDER BY count DESC LIMIT 3;`;
        console.log("res", res);
        return res;


        //   const obj =  await prisma.transactions.aggregate({
    //     item_id: true,
    //     _count :{item_id: true},
    //     orderBy: {_count: 'desc'},
    //     take: 3
    // });
    // console.log(obj)
    // return obj;


    // const topItems = await prisma.transactions.groupBy({
    //     by: ['item_id'],
    //     _count: {
    //         item_id: true
    //     },
    //     orderBy: {
    //         _count: 'desc'
    //     },
    //     take: 3
    // });

    // return topItems;
} 
    catch(err){
        console.log(err);
      }
      
}

async function getTopSellerItems(sellerId){
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

async function getLeastPopularItem(sellerId){
    try{
        return await prisma.$queryRaw`SELECT item_id, COUNT(item_id) as count FROM transactions WHERE seller_id = ${sellerId} GROUP BY item_id ORDER BY count ASC LIMIT 1;`;
    }
    catch(err){
        console.log(err);
    }
}




export {getTotalPriceWeek, getTopSellers, getTotalSpentWeek, getTopItems, getTopSellerItems, getLeastPopularItem};