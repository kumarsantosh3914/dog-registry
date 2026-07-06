import { NextFunction, Request, Response } from "express";
import { createDog, deleteDog, getAllDogs, getDogById, updateDog } from "../services/dog.service";

export async function createDogHandler(req: Request, res: Response, next: NextFunction) {
    const response = await createDog(req.body);

    res.status(201).json({
        message: "Dog created successfully",
        data: response,
        success: true,
    });
}

export async function getDogByIdHandler(req: Request, res: Response, next: NextFunction) {
    const response = await getDogById(req.params.id);

    res.status(200).json({
        message: "Dog fetched successfully",
        data: response,
        success: true,
    });
}

export async function getAllDogsHandler(req: Request, res: Response, next: NextFunction) {
    const response = await getAllDogs();

    res.status(200).json({
        message: "Dogs fetched successfully",
        data: response,
        success: true,
    });
}

export async function updateDogHandler(req: Request, res: Response, next: NextFunction) {
    const response = await updateDog(req.params.id, req.body);

    res.status(200).json({
        message: "Dog updated successfully",
        data: response,
        success: true,
    });
}

export async function deleteDogHandler(req: Request, res: Response, next: NextFunction) {
    const response = await deleteDog(req.params.id);

    res.status(200).json({
        message: "Dog deleted successfully",
        data: response,
        success: true,
    });
}