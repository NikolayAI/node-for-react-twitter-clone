import { Document, model, Schema } from 'mongoose';


export interface IUserModel {
  _id?: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirmHash: string;
  confirmed?: boolean;
  location?: string;
  about?: string;
  website?: string;
}

type UserModelDocumentType = IUserModel & Document

const UserSchema = new Schema<UserModelDocumentType>({
  email: {
    unique: true,
    required: true,
    type: String,
  },
  fullname: {
    required: true,
    type: String,
  },
  username: {
    unique: true,
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  confirmHash: {
    required: true,
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  location: String,
  about: String,
  website: String,
});

UserSchema.set('toJSON', {
  transform: (_: any, obj: any) => {
    delete obj.password;
    delete obj.confirmHash;
    return obj;
  }
});

export const UserModel = model<UserModelDocumentType>('User', UserSchema);