import { getSellerById } from '@/repo/api-repo.js';


export async function GET(request, {params}){
    const seller = await getSellerById(params.id)
    if (seller)
        return Response.json(seller, {status : 200})
    else
        return Response.json({message : "Seller not found"}, {status : 404})
}