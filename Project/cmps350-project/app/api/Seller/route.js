import { getAllSellers } from '@/repo/api-repo.js';

export async function GET(request){
    const sellers = await getAllSellers();
    return Response.json(sellers, {status : 200});
}   