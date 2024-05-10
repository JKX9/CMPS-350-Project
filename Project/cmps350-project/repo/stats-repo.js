import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getTotalPriceWeek(){
    try{
        return await prisma.$queryRaw`SELECT SUM(price) as total FROM transaction WHERE date > DATE_SUB(NOW(), INTERVAL 1 WEEK);`;
    }
    catch(err){
        console.log(err);
    }
}

async function getTopSellers(buyerId){
    try{
        return await prisma.$queryRaw`SELECT seller_id, COUNT(seller_id) as count FROM transaction WHERE buyer_id = ${buyerId} GROUP BY seller_id ORDER BY count DESC LIMIT 3;`;
    }
    catch(err){
        console.log(err);
    }
}

async function getTotalSpentWeek(buyerId){
    try{
        return await prisma.$queryRaw`SELECT SUM(price) as total FROM transaction WHERE buyer_id = ${buyerId} AND date > DATE_SUB(NOW(), INTERVAL 1 WEEK);`;
    }
    catch(err){
        console.log(err);
    }
}

async function getTopItems(){
    try{
        const res =  await prisma.$queryRaw`SELECT item_id, COUNT(item_id) as count FROM "public"."Transactions" GROUP BY item_id ORDER BY count DESC LIMIT 3;`;
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
    try{
        return await prisma.$queryRaw`SELECT item_id, COUNT(item_id) as count FROM transaction WHERE seller_id = ${sellerId} GROUP BY item_id ORDER BY count DESC LIMIT 3;`;
    }
    catch(err){
        console.log(err);
    }
}

async function getLeastPopularItem(sellerId){
    try{
        return await prisma.$queryRaw`SELECT item_id, COUNT(item_id) as count FROM transaction WHERE seller_id = ${sellerId} GROUP BY item_id ORDER BY count ASC LIMIT 1;`;
    }
    catch(err){
        console.log(err);
    }
}


export {getTotalPriceWeek, getTopSellers, getTotalSpentWeek, getTopItems, getTopSellerItems, getLeastPopularItem};