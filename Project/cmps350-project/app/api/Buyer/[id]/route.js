import { getBuyerById } from '@/repo/api-repo.js';


export async function GET(request, {params}){
    const buyer = await getBuyerById(params.id)
    if (buyer)
        return Response.json(buyer, {status : 200})
    else
        return Response.json({message : "Buyer not found"}, {status : 404})
}

