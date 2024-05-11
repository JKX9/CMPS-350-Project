import { getItemByBuyerId, getItemById } from '@/repo/api-repo.js';
import { updateBuyer } from '@/repo/api-repo.js';


export async function GET(request, {params}){
    const buyer = await getItemByBuyerId(params.id)
    if (buyer)
        return Response.json(buyer, {status : 200})
    else
        return Response.json({message : "Buyer not found"}, {status : 404})
}

export async function PUT(request, {params}){
    const buyer = await getBuyerById(params.id);
    const newBuyer = request.json();
    const updatedBuyer = await updateBuyer(buyer, newBuyer);
    return Response.json(updatedBuyer, {status : 200});
}

