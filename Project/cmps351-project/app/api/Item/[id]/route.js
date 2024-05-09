import { getItemById } from '@/repo/api-repo.js';


export async function GET(request, {params}){
    const item = await getItemById(params.id)
    if (item)
        return Response.json(item, {status : 200})
    else
        return Response.json({message : "Item not found"}, {status : 404})
}