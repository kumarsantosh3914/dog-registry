import { Dog } from "../models/dog.model";
import { IDog } from "../types/dog.type";
import BaseRepository from "./base.repository";

export class DogRepository extends BaseRepository<IDog> {
    constructor() {
        super(Dog);
    }
}
