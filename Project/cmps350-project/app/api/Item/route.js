import { getItems } from '@/repo/api-repo.js';


export async function GET(request){
    const items = await getItems()
    if (items)
        return Response.json(items, {status : 200})
    else
        return Response.json({message : "No items found"}, {status : 404})
}