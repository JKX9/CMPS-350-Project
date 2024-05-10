import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function getAdmins(username, password){
    const admins = await prisma.admin.findFirst({  where: {
        AND: [
          { username: username }, 
          { password: password }  
        ]
      }
    });
    return admins;
}
async function getBuyers(username, password){
    const buyer = await prisma.buyer.findFirst({where: {
        AND: [
          { username: username }, 
          { password: password }  
        ]
      }
    });
    return buyer;
}
async function getSellers(username, password){
    const seller = await prisma.seller.findFirst({where: {
        AND: [
          { username: username }, 
          { password: password }  
        ]
      }
    });
    return seller;
}

export {getAdmins, getBuyers, getSellers}