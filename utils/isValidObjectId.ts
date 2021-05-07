import { mongoose } from '../core';


export const isValidObjectId = mongoose.Types.ObjectId.isValid;