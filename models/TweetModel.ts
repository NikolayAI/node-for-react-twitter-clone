import { Document, model, Schema } from 'mongoose';
import { IUserModel } from './UserModel';

export interface ITweetModel {
  _id?: string;
  text: string;
  user: IUserModel;
}

export type TweetModelDocumentType = ITweetModel & Document

const TweetSchema = new Schema<TweetModelDocumentType>({
    text: {
      required: true,
      type: String,
      maxLength: 280,
    },
    user: {
      required: true,
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
    images: [{ type: String }],
  },
  {
    timestamps: true
  },
);

export const TweetModel = model<TweetModelDocumentType>('Tweet', TweetSchema);