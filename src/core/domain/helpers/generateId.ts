import {v4 as uuid4} from "uuid";

/**
 * Generates a limited-length random identifier based on UUID v4
 *
 * @param {number} maxLength - The maximum length of the identifier to return
 * @returns {string} A unique identifier truncated to the specified length
 *
 * @example
 // Returns an 8-character ID
 * const id = getRandomId(8);
 * // Example output: “a1b2c3d4”
 */

export function getRandomId(maxLength: number): string {
    const uuid = uuid4();
    return uuid.slice(0, maxLength);
}
