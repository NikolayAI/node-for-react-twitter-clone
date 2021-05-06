import { Document, model, Schema } from 'mongoose';


export interface ITweetModel {
  _id?: string;
  text: string;
  user: string;
}

export type TweetModelDocumentType = ITweetModel & Document

const TweetSchema = new Schema<TweetModelDocumentType>({
  text: {
    required: true,
    type: String,
  },
  user: {
    required: true,
    ref: 'User',
    type: Schema.Types.ObjectId,
  }
});

export const TweetModel = model<TweetModelDocumentType>('User', TweetSchema);