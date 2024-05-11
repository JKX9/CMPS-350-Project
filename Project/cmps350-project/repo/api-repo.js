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

async function getItemByBuyerId(buyerId){ 
        try{
            const transactions = await prisma.transactions.findMany({
                where: { buyer_id: buyerId }
            });
    
            if (transactions.length === 0) {
                return null;
            }    
            const itemId = transactions[2].item_id;
                const item = await prisma.item.findUnique({
                where: { id: itemId }
            });
    
            return item;
        } catch(err){
            console.error(err);
        }
}

async function addToSellerSoldItems(sellerId, itemId){
    try{
        return await prisma.seller.update({
            where: { id: sellerId },
            data: {
                soldItems: {
                    connect: { id: itemId }
                }
            }
        });
    }catch(err){
        console.error(err);
    }
}
async function updateBuyer(buyer, newBuyer){
    try{
        return await prisma.buyer.update({
            where: {id : buyer.id},
            data: newBuyer
        });
    }
    catch(err){
        console.log(err);
    }
}

async function addNewItem(seller_id, item){
    try{
        const theItem =  await prisma.item.create({
            data: item
        });
        console.log("----------", theItem);
        const seller = await prisma.seller.update({
            where: { id: seller_id },
            data: {
                itemsForSale: {
                    connect: { theItem }
                }
            }
        });
        console.log("----------",seller);
        return true;
    }
    catch(err){
        console.log(err);
    }
}

async function getAllSellers(){
    try{
        return await prisma.seller.findMany();
    }
    catch(err){
        console.log(err);
    }

}




export {getBuyerById, getSellerById,getItemById, getItems, 
    getItemByBuyerId, addToSellerSoldItems,addNewItem , updateBuyer, getAllSellers};
