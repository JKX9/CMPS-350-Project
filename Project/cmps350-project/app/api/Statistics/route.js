//import all functions from stats-repo.js
import {getTotalPriceWeek, getTopSellers, getTotalSpentWeek, getTopItems, getTopSellerItems, getLeastPopularItem} from '../../../repo/stats-repo.js';

export async function GET(request){
    if(!request.url.includes('?')){
            const queryParams = Object.fromEntries(new URLSearchParams(request.url.split('?')[1]));
    const id = queryParams.id;
    const type = queryParams.type;
    const topItems = await getTopItems();
    const totalPriceWeek = await getTotalPriceWeek();
    if (type === "seller"){
        const topItems = await getTopSellerItems(id);
        const leastPopularItem = await getLeastPopularItem(id);
        return Response.json({topItems, leastPopularItem, topItems, totalPriceWeek, id}, {status : 200});
    }
    if (type === "buyer"){
        const topSellers = await getTopSellers(id);
        const totalSpentWeek = await getTotalSpentWeek(id);
        return Response.json({topSellers, totalSpentWeek, topItems, totalPriceWeek, id}, {status : 200});
    }
    return Response.json('No account found', {status : 404});
    }else{
            const queryParams = 
    Object.fromEntries(
        new URLSearchParams(
            request.url.split('?')[1])
            .entries()
    );

        console.log("Query parameters:", queryParams);
        console.log("Key = ", Object.keys(queryParams)[0].toString());
        console.log("Value = ", Object.values(queryParams)[0].toString());
    }






}