import {getAdmins, getBuyers, getSellers} from '@/repo/acc-repo.js'

export async function POST(request){
    const body = await request.json();
    const username = body.username;
    const password = body.password;

    const admins = await getAdmins(username, password);
    const buyers = await getBuyers(username, password);
    const sellers = await getSellers(username, password);

    if(!admins && !buyers && !sellers){
        return Response.json({message: "No accounts found"}, {status: 404});
    }else if(admins){ 
        return Response.json({admins: admins, message : "admin"}, {status: 200});
    }else if(buyers){
        return Response.json({buyers: buyers, message : "buyer"}, {status: 200});
    }else if(sellers){
        return Response.json({sellers: sellers, message : "seller"}, {status: 200});
    }else{
        return Response.json({message: "Error"}, {status: 500});
    }
}