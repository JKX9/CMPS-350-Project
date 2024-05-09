import { PrismaClient } from '@prisma/client'
import { getBuyerById } from '@/my-app/repo/api-repo.js';

const prisma = new PrismaClient()

export async function GET(request, {params}){
    const id = params.id;
    const buyer = 
}

