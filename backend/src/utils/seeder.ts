import { Dog } from "../models/dog.model";
import * as fs from "fs";
import * as path from "path";

export async function seedDogs() {
    try {
        const count = await Dog.countDocuments();
        if (count > 0) {
            console.log("Database already contains dog data. Skipping seed.");
            return;
        }

        console.log("Database is empty. Seeding dog data from dogs.json...");
        const jsonPath = path.join(__dirname, "../../dogs.json");
        
        if (!fs.existsSync(jsonPath)) {
            console.warn("dogs.json not found at:", jsonPath);
            return;
        }

        const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
        const dogsToInsert = Object.keys(data).map((breed) => {
            // Format to Title Case/Capitalized for professional UI presentation
            const capitalizedBreed = breed.charAt(0).toUpperCase() + breed.slice(1);
            const capitalizedSubBreeds = data[breed].map(
                (sb: string) => sb.charAt(0).toUpperCase() + sb.slice(1)
            );
            return {
                breed: capitalizedBreed,
                subBreads: capitalizedSubBreeds,
                isDeleted: false
            };
        });

        await Dog.insertMany(dogsToInsert);
        console.log(`Successfully seeded ${dogsToInsert.length} dogs.`);
    } catch (error) {
        console.error("Error seeding database:", error);
    }
}
