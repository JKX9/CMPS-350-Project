import {getTransactionById} from '@/repo/transaction-repo.js';

export async function GET(request, {params}){
    const transaction = await getTransactionById(params.id);
    return Response.json(transaction, {status : 200});
}