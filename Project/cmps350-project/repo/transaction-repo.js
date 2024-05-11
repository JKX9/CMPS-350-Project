'use server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getTransactionById(request, {params}){
    const id = params.id;
    const transaction = await prisma.transactions.findUnique({
        where: {id : parseInt(id)}
    });
    return Response.json(transaction, {status : 200} )
}

async function addTransaction(request){
    const transaction = request.json();
    const newTransaction = await prisma.transactions.create({
        data : transaction
    });
    return Response.json(newTransaction, {status : 201});
}

export {getTransactionById, addTransaction};
