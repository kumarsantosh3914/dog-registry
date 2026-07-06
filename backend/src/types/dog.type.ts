export interface IDog {
    id?: string;
    breed: string;
    subBreads: string[];
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}