
import { Db, MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.DB_CONN_STRING as string;

export class DatabaseService {

    private client: MongoClient | undefined;
    private db: Db | undefined;

    
    public async run() {
        try { 
            this.client = new MongoClient(uri, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true
                }
            })

            await this.client.connect();
            this.db = this.client.db(process.env.DB_DB);
            
            console.log('Successfully connected to MongoDB.');

        } catch (err) {
            console.log(err);
        }
    }

    public async getSuggestionByID(id: number) {
        const collection = this.db?.collection("suggestions");
        return await collection?.find({}).toArray();
    }
}

const dbService = new DatabaseService();

export default dbService;
