import { CreateDogDTO, UpdateDogDTO } from "../dto/dog.dto";
import { DogRepository } from "../repositories/dog.repository";

const dogRepository = new DogRepository();

export async function createDog(dogDto: CreateDogDTO) {
    return dogRepository.create(dogDto);
}

export async function getDogById(id: string) {
    return dogRepository.findById(id);
}

export async function getAllDogs() {
    return dogRepository.findAll();
}

export async function updateDog(id: string, dogDto: UpdateDogDTO) {
    return dogRepository.update(id, dogDto);
}

export async function deleteDog(id: string) {
    return dogRepository.delete(id);
}