import { Schema, Document, model } from 'mongoose';

interface IItems extends Document {
  name: string;
  description: string;
  owner: string;
  powers: string[];
  origin: string;
}

const ItemSchema = new Schema<IItems>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: String, required: true },
    powers: { type: [String], required: true },
    origin: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<IItems>('Item', ItemSchema);
