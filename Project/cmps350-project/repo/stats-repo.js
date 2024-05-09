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
        return await prisma.$queryRaw`SELECT item_id, COUNT(item_id) as count FROM transaction WHERE date > DATE_SUB(NOW(), INTERVAL 1 WEEK) GROUP BY item_id ORDER BY count DESC LIMIT 3;`;
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