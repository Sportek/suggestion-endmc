import { Db, MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.DB_CONN_STRING as string;

export class DatabaseService {
  private client: MongoClient | undefined;
  private db: Db | undefined;
  private isInitialized: boolean = false;

  constructor() {
    this.run();
  }

  public async run() {
    if (!this.isInitialized) {
      try {
        this.client = new MongoClient(uri, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          },
        });

        await this.client.connect();
        this.db = this.client.db(process.env.DB_DB);

        console.log("Successfully connected to MongoDB.");
      } catch (err) {
        console.log(err);
      }
    }
  }

  public getDatabase() {
    return this.db;
  }
}

declare global {
  var database: DatabaseService;
}

export const db = globalThis.database || new DatabaseService();

if(process.env.NODE_ENV !== "production") globalThis.database = db;
