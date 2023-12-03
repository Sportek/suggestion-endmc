import { db } from "./Database";

const DB_COLLECTION_ACCOUNTS = "accounts"

export type Account = {
    userId: string,
    name: string,
    imageUrl: string,
    email: string
}

export class UsersData {

    private database;
    private collection;
    constructor () {
        this.database =  db.getDatabase();
        if(this.database) {
            this.collection =  this.database.collection(DB_COLLECTION_ACCOUNTS);
        }
    }

    public async getAllAccounts() {
        return await this.collection?.find({}).toArray() as Account[] | undefined;
    }

    public async getAccountByID(id: string) {
        return await this.collection?.findOne({ userId: id }) as Account | undefined;
    }

    public async createAccount(account: Account) {
        await this.collection?.insertOne(account);

        return await this.collection?.findOne({userId: account.userId});
    }
}