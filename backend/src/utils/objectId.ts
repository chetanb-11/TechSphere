import { ObjectId } from "mongodb";

/**
 * Validates and converts a string to a MongoDB ObjectId.
 * Throws a descriptive error (with statusCode 400) if the string is not a valid ObjectId.
 */
export function toObjectId(id: string, label = "ID"): ObjectId {
    if (!ObjectId.isValid(id)) {
        const err = new Error(`Invalid ${label}: "${id}"`) as Error & { statusCode: number };
        err.statusCode = 400;
        throw err;
    }
    return new ObjectId(id);
}
