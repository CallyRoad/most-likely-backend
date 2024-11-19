import {GameEmitter} from "@/core/domain/ports/game/game-emitter";
import {Player} from "@/core/domain/entities/player";
import {JoinAsGuestPlayer} from "@/core/domain/usecases/player/join-as-guest-player";
import {getRandomId} from "@/core/domain/helpers/generateId";
import {SettingsId} from "@/core/domain/settings";

describe("JoinAsGuestPlayer", () => {

    let gameEmitterMock: jest.Mocked<GameEmitter>;
    let joinAsGuestPlayer: JoinAsGuestPlayer;

    // Initialize  GameEmitter mock with Jest mock functions
    gameEmitterMock = {
        emit: jest.fn(),
        emitAll: jest.fn(),
        emitPlayerJoined: jest.fn(),
        emitVoteReceived: jest.fn()
    };

    beforeEach(() => {
        // Clear all mocks
        jest.clearAllMocks();

        // Create a new instance of JoinAsGuestPlayer with the mock
        joinAsGuestPlayer = new JoinAsGuestPlayer(gameEmitterMock);
    });

    it("should emit player joined event", () => {

        // Test data
        const gameId= getRandomId(SettingsId.GAME_ID);
        const nickname = "John";

        // Execute the usecase
        const player = joinAsGuestPlayer.execute(gameId, nickname);

        // Check if the returned player is valid
        expect(player).toBeInstanceOf(Player);
        expect(player.getId()).toHaveLength(SettingsId.USER_ID);
        expect(player.getNickname()).toBe(nickname);

        // Verify that the event was emitted with correct parameters
        expect(gameEmitterMock.emitPlayerJoined).toHaveBeenCalledWith(gameId, player);

        // Verify that the event was emitted one time
        expect(gameEmitterMock.emitPlayerJoined).toHaveBeenCalledTimes(1);
    });
});