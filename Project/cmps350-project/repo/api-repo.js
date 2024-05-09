import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const apiRepo = {

    async addItem(item){
        try{
            return await prisma.item.create({
                data: item
            });
        }
        catch(err){
            console.log(err);
        }
    }
}

async function getBuyerById(buyerId){
    try{
        return await prisma.buyer.findUnique({
            where: {id : parseInt(buyerId)}
        });
    }
    catch(err){
        console.log(err);
    }
}



async function getSellerById(sellerId){
    try{
        return await prisma.seller.findUnique({
            where: {id : parseInt(sellerId)}
        });
    }
    catch(err){
        console.log(err);
    }
}

async function getItemById(itemId){
    try{
        return await prisma.item.findMany({
            where: {item_id : parseInt(itemId)}
        });
    }
    catch(err){
        console.log(err);
    }
}


async function getItems(){
    try{
        return await prisma.item.findMany();
    }
    catch(err){
        console.log(err);
    }
}




export {getBuyerById, getSellerById,getItemById, getItems};