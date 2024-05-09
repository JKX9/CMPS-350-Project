import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const apiRepo = {
    async getBuyerById(buyerId){
        try{
            return await prisma.buyer.findUnique({
                where: {id : buyerId}
            });
        }
        catch(err){
            console.log(err);
        }
    },

    async getSellerById(sellerId){
        try{
            return await prisma.seller.findUnique({
                where: {id : sellerId}
            });
        }
        catch(err){
            console.log(err);
        }
    },

    async getItems(){
        try{
            return await prisma.item.findMany();
        }
        catch(err){
            console.log(err);
        }
    },

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

export { getBuyerById};