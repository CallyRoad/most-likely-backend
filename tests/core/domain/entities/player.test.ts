import {Player} from "@/core/domain/entities/player";
import {
    EmptyEmailError,
    EmptyNicknameError,
    EmptyPasswordError, InvalidEmailFormatError,
    LongNicknameError,
    ShortNicknameError, WeakPasswordError
} from "@/core/domain/errors";

describe("Player entity", () => {
    //Player
    describe("Player creation without registration", () => {
        it("should create a new player with valid parameters", () => {
            const player = new Player("player-123", "John", false);
            expect(player.getId()).toBe("player-123");
            expect(player.getNickname()).toBe("John");
            expect(player.getScore()).toBe(0);
            expect(player.getRegisteredPlayerData()).toBeNull();
            expect(player.getEmail()).toBeUndefined();
            expect(player.isPlayerRegistered()).toBe(false);
        });

        it('should return null registered data for guest player', () => {
            const player = new Player('id-1', 'John', false);
            expect(player.getRegisteredPlayerData()).toBeNull();
        });
    });

    describe("Register player", () => {
        it("schould create a new register player with valid parameters", () => {
            const player = new Player(
                "player-123",
                "John",
                true,
                "john@example.com",
                "Password123!"
            );
            expect(player.isPlayerRegistered()).toBe(true);
        });


        it('should return registered data for registered player', () => {
            const player = new Player(
                'id-1',
                'John',
                true,
                'john@example.com',
                'hashedPassword123'
            );
            const registeredData = player.getRegisteredPlayerData();
            expect(registeredData).not.toBeNull();
            expect(registeredData?.email).toBe('john@example.com');
        });

    //     it('should throw InvalidRegistrationDataError if registered without email', () => {
    //         expect(() => new Player(
    //             'player-123',
    //             'John',
    //             true,
    //             undefined,
    //             'password123'
    //         )).toThrow(EmptyEmailError);
    //     });
    //
    //     it('should throw InvalidRegistrationDataError if registered without password', () => {
    //         const emptyPassword = "";
    //         expect(() => new Player(
    //             'player-123',
    //             'John',
    //             true,
    //             'john@example.com',
    //             emptyPassword
    //         )).toThrow(EmptyPasswordError);
    //     });
    //
    //     it('should throw InvalidEmailError for invalid email format', () => {
    //         expect(() => new Player(
    //             'player-123',
    //             'John',
    //             true,
    //             'invalid-email',
    //             'hashedPassword123'
    //         )).toThrow(InvalidEmailFormatError);
    //     });
    //
    //     it('should throw WeakPasswordError for short password', () => {
    //         expect(() => new Player(
    //             'player-123',
    //             'John',
    //             true,
    //             'john@example.com',
    //             'short'
    //         )).toThrow(WeakPasswordError);
    //     });
    });

    // Nickname validation
    describe("Nickname validation", () => {
        it("should throw EmptyNicknameError if the nickname is empty", () => {
            expect(() => new Player("player-123", "", false)).toThrow(EmptyNicknameError);
        });

        it("should throw ShortNicknameError if the nickname is too short", () => {
            expect(() => new Player("player-123", "A", false)).toThrow(ShortNicknameError);
        });

        it("should throw LongNicknameError if the nickname is too long", () => {
            const longNickname = "a".repeat(41);
            expect(() => new Player("player-123", longNickname, false)).toThrow(LongNicknameError);
        });
    })

    // Questions
    // describe("Custom question", () => {
    //
    // });

    // Score
    describe("Score management", () => {
        it("should update player score", () => {
            const player = new Player("player-123", "John", false);
            player.incrementScore();
            expect(player.getScore()).toBe(1);
        });
    });

});