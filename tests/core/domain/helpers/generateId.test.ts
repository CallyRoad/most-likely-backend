import {getRandomId} from "@/core/domain/helpers/generateId";

describe("getRandomId", () => {
    it("should generate string of specified length", () => {
        const userId = getRandomId(5);
        expect(typeof userId).toBe("string");
        expect(userId).toHaveLength(5);
    })
})
