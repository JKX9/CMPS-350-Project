import { addTransaction } from "@/repo/transaction-repo.js";

export async function POST(request){
    const transaction = request.json();
    const newTransaction = await addTransaction(transaction);
    return Response.json(newTransaction, {status : 201});
}