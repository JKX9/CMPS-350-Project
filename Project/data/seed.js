import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const adminsPath = path.join(process.cwd(), '/data/admins.json')
const buyersPath = path.join(process.cwd(), '/data/customers.json')
const sellersPath = path.join(process.cwd(), '/data/sellers.json')
const itemsPath = path.join(process.cwd(), '/data/NewItems.json')


async function main() {
    try {
        const items = await fs.readJSON(itemsPath)
        const admins = await fs.readJSON(adminsPath)
        const buyers = await fs.readJSON(buyersPath)
        const sellers = await fs.readJSON(sellersPath)

        // for (const admin of admins) {
        //     await prisma.admin.create({
        //         data: admin
        //     })
        // }

        // for (const buyer of buyers) {
        //     await prisma.buyer.create({
        //         data: buyer
        //     })
        // }

        // for (const seller of sellers) {
        //     await prisma.seller.create({
        //         data: seller
        //     })
        // }

        // for (const item of items) {
        //     await prisma.item.create({
        //         data: item
        //     })
        // }

    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })