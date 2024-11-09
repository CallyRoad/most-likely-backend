import { Player } from "@/core/domain/entities/player.js";
import { EmptyNicknameError, LongNicknameError, ShortNicknameError } from "@/core/domain/errors.js";
describe("Player entity", () => {
    it("should create a new player with valid parameters", () => {
        const player = new Player("player-123", "John");
        expect(player.getId()).toBe("player-123");
        expect(player.getNickname()).toBe("John");
        expect(player.getScore()).toBe(0);
    });
    it("should throw EmptyNicknameError if the nickname is empty", () => {
        expect(() => new Player("player-123", "")).toThrow(EmptyNicknameError);
    });
    it("should throw ShortNicknameError if the nickname is too short", () => {
        expect(() => new Player("player-123", "A")).toThrow(ShortNicknameError);
    });
    it("should throw LongNicknameError if the nickname is too long", () => {
        const longNickname = "a".repeat(41);
        expect(() => new Player("player-123", longNickname)).toThrow(LongNicknameError);
    });
    it("should update player score", () => {
        const player = new Player("player-123", "John");
        player.incrementScore();
        expect(player.getScore()).toBe(1);
    });
});
//# sourceMappingURL=player.test.js.map