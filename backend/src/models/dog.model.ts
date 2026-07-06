import { model, Schema } from "mongoose";
import { IDog } from "../types/dog.type";

const DogSchema = new Schema<IDog>({
    breed: {
        type: String,
        required: true
    },
    subBreads: {
        type: [String],
        default: []
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

export const Dog = model<IDog>('Dog', DogSchema);