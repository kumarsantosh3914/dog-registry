import { Model, Types } from "mongoose";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";

abstract class BaseRepository<T> {
    constructor(private readonly model: Model<T>) { }

    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }

    async findById(id: string): Promise<T | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestError("Invalid ID format");
        }
        const record = await this.model.findById(id);
        if (!record) {
            throw new NotFoundError("Record not found");
        }
        return record;
    }

    async findAll(): Promise<T[]> {
        return this.model.find();
    }

    async update(id: string | Types.ObjectId, data: Partial<T>): Promise<T | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestError("Invalid ID format");
        }

        const record = this.model.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        if (!record) {
            throw new NotFoundError("Record not found");
        }

        return record;
    }

    async delete(id: string | Types.ObjectId): Promise<T | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestError("Invalid ID format");
        }

        const record = this.model.findByIdAndDelete(id);

        if (!record) {
            throw new NotFoundError("Record not found");
        }

        return record;
    }
}

export default BaseRepository;