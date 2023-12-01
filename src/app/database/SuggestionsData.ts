import { Collection, Db } from "mongodb";
import { db } from "./Database";

const DB_COLLECTION_SUGGESTIONS = "suggestions"

export class SuggestionsData {

    private database;
    private collection;
    constructor () {
        this.database =  db.getDatabase();
        if(this.database) {
            this.collection =  this.database.collection(DB_COLLECTION_SUGGESTIONS);
        }
    }

    public async getAllSuggestions() {
        return await this.collection?.find({}).toArray();
    }

    public async getSuggestionsByAuthorID(author_id: number) {
        return await this.collection?.find({ author_id }).toArray();
    }
}