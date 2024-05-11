import { getSellerById, addToSellerSoldItems, addNewItem } from '@/repo/api-repo.js';


export async function GET(request, {params}){
    const seller = await getSellerById(params.id)
    if (seller)
        return Response.json(seller, {status : 200})
    else
        return Response.json({message : "Seller not found"}, {status : 404})
}

export async function POST(request, {params}){
    const seller = await addToSellerSoldItems(params.seller_id, params.item_id)
    if (seller)
        return Response.json(seller, {status : 200})
    else
        return Response.json({message : "Seller not found"}, {status : 404})
}

export async function PUT(request){
    const body = await request.json()
    console.log("-------------",body)
    const updated = await addNewItem(body.seller_id, body.item)
    if (updated)
        return Response.json(updated, {status : 200})
    else
        return Response.json({message : "Seller not found"}, {status : 404})
}

async function test(){
    
    const theTest = await fetch(`http://localhost:3000/api/Seller/10`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({seller_id: 10, item : {
            item_name: "test",
            item_price: 10,
            item_stock: 10,
            item_img: "test"

        }})
    });

    console.log(theTest)
}