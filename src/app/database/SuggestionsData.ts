import { ObjectId } from "mongodb";
import { db } from "./Database";

const DB_COLLECTION_SUGGESTIONS = "suggestions";

export type SuggestionType = {
  suggestionId: string;
  authorId: string;
  title: string;
  suggestion: string;
  likes: { userId: string }[];
  dislikes: { userId: string }[];
};

export class SuggestionsData {
  private database;
  private collection;
  constructor() {
    this.database = db.getDatabase();
    if (this.database) {
      this.collection = this.database.collection(DB_COLLECTION_SUGGESTIONS);
    }
  }

  public async getAllSuggestions() {
    return (await this.collection?.find({}).toArray()) as
      | SuggestionType[]
      | undefined;
  }

  public async getSuggestionsByAuthorID(author_id: string) {
    return await this.collection?.find({ author_id }).toArray();
  }

  public async getSuggestionById(suggestionId: string) {
    return (await this.collection?.findOne({ suggestionId })) as
      | SuggestionType
      | undefined;
  }

  public async createSuggestion(suggestion: SuggestionType) {
    suggestion.suggestionId = new ObjectId().toString();
    suggestion.likes = [];
    suggestion.dislikes = [];
    return await this.collection?.insertOne(suggestion);
  }

  public async appreciateSuggestion(
    authorId: string,
    suggestionId: string,
    action: "like" | "dislike"
  ) {
    const suggestion = await this.getSuggestionById(suggestionId);
    if (!suggestion) return;

    if (action == "like") {
      if (
        // On vérifie s'il a déjà like ou pas.
        suggestion.likes.filter((like) => like.userId === authorId).length === 0
      ) {
        // Retirer son dislike
        suggestion.dislikes = suggestion.dislikes.filter(
          (dislike) => dislike.userId !== authorId
        );

        // Ajouter son like
        suggestion.likes.push({ userId: authorId });
      }
    } else {
      if (
        // On vérifie s'il a déjà like ou pas.
        suggestion.dislikes.filter((dislike) => dislike.userId === authorId)
          .length === 0
      ) {
        // Retirer son like
        suggestion.likes = suggestion.likes.filter(
          (like) => like.userId !== authorId
        );

        // Ajouter son dislike
        suggestion.dislikes.push({ userId: authorId });
      }
    }

    // update data
    this.collection?.updateOne({ suggestionId }, { $set: suggestion });
  }
}
