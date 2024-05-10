import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getTotalPriceWeek(){
    try{
        return await prisma.$queryRaw`SELECT SUM(price) as total FROM transactions WHERE date > DATE_SUB(NOW(), INTERVAL 1 WEEK);`;
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
        return await prisma.$queryRaw`SELECT SUM(price) as total FROM transactions WHERE buyer_id = ${buyerId} AND date > DATE_SUB(NOW(), INTERVAL 1 WEEK);`;
    }
    catch(err){
        console.log(err);
    }
}

async function getTopItems(){
    try {
        const transactions = await prisma.transactions.findMany({
          select: { item_id: true },
        });
      
        // Perform aggregation on the client side
        const itemCounts = transactions.reduce((acc, transaction) => {
          acc[transaction.item_id] = (acc[transaction.item_id] || 0) + 1;
          return acc;
        }, {});
      
        // Convert the aggregated data to an array of objects
        const topItems = Object.entries(itemCounts)
          .sort(([, count1], [, count2]) => count2 - count1) // Sort by count in descending order
          .slice(0, 3) // Take top 3 items
          .map(([item_id, count]) => ({ item_id: parseInt(item_id), count }));
      console.log(topItems);
        return topItems;
      } catch (err) {
        console.log(err);
      }
      
}

async function getTopSellerItems(sellerId){
    try{
        return await prisma.$queryRaw`SELECT item_id, COUNT(item_id) as count FROM transactions WHERE seller_id = ${sellerId} GROUP BY item_id ORDER BY count DESC LIMIT 3;`;
    }
    catch(err){
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