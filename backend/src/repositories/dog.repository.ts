import { Dog } from "../models/dog.model";
import { IDog } from "../types/dog.type";
import BaseRepository from "./base.repository";

export class DogRepository extends BaseRepository<IDog> {
    constructor() {
        super(Dog);
    }

    async groupByBreed(): Promise<{ breed: string; count: number }[]> {
        return Dog.aggregate([
            { $match: { isDeleted: { $ne: true } } },
            { $group: { _id: "$breed", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $project: { _id: 0, breed: "$_id", count: 1 } },
        ]);
    }
}
