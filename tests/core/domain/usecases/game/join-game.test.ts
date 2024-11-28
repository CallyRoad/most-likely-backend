import {JoinGameUseCase} from "@/core/domain/usecases/game/join-game";
import {Room} from "@/core/domain/ports/game/room";
import {GameCenter} from "@/core/domain/entities/game-center";
import {Player} from "@/core/domain/entities/player";
import {
    GameHasNoHostError,
    GameNotFoundError,
    PlayerAlreadyInGameError,
    PlayerAlreadyInOtherGameError
} from "@/core/domain/errors";
import {Question} from "@/core/domain/entities/questions";
import {getRandomId} from "@/core/domain/helpers/generateId";
import {SettingsId} from "@/core/domain/settings";

describe("JoinGameUsecase", () => {
    let gameCenter: GameCenter;
    let room: jest.Mocked<Room>;
    let joinGame: JoinGameUseCase;
    let questions: Question[];

    room = {
        joinRoom: jest.fn(),
        leaveRoom: jest.fn()
    }

    beforeEach(() => {
        jest.resetAllMocks();

        GameCenter.resetInstance();
        gameCenter = GameCenter.getInstance();

        questions = [
            new Question(getRandomId(SettingsId.QUESTION_ID), "How have the most...", true),
            new Question(getRandomId(SettingsId.QUESTION_ID), "How have the most...", true),
            new Question(getRandomId(SettingsId.QUESTION_ID), "How have the most...", true),
            new Question(getRandomId(SettingsId.QUESTION_ID), "How have the most...", true),
            new Question(getRandomId(SettingsId.QUESTION_ID), "How have the most...", true)
        ];

        joinGame = new JoinGameUseCase(room);
    });

    it("should allow player to join game room", () => {
        const hostPlayer = new Player("12345", "hostPlayer", false);
        const game = gameCenter.createNewGame(hostPlayer,questions);

        const newPlayer = new Player("67890", "Player", false);
        joinGame.execute(game.getId(), newPlayer);

        expect(room.joinRoom).toHaveBeenCalledWith(game.getId(), newPlayer);
        expect(game.getPlayersList()).toHaveLength(2);
        expect(game.getPlayer(newPlayer.getId())).toBeDefined();
    });

    it("should throw GameNotFoundError", () => {
       const hostPlayer = new Player("12345", "hostPlayer", false);

       expect(() => joinGame.execute("non-existant-game", hostPlayer)).toThrow(GameNotFoundError);
    });

    it("should throw GameHasNoHostError when game has no host", () => {
        const game = gameCenter.createNewGame(new Player("12345", "hostPlayer", false), questions);
        game.getPlayersList().length = 0;

        const newPlayer = new Player("45678", "Player", false);

        expect(() => joinGame.execute(game.getId(), newPlayer)).toThrow(GameHasNoHostError);
    })

    it("should throw PlayerAlreadyInGameError when player tries to join twice", () => {
        const hostPlayer = new Player("12345", "Host", false);
        const game = gameCenter.createNewGame(hostPlayer, questions);
        const player = new Player("45678", "Player", false);

        joinGame.execute(game.getId(), player);

        expect(() =>
            joinGame.execute(game.getId(), player)).toThrow(PlayerAlreadyInGameError);
    });

    it("should throw PlayerAlreadyInOtherGameError when player is in another game", () => {
        const hostPlayer = new Player("12345", "Host", false);
        const game1 = gameCenter.createNewGame(hostPlayer, questions);
        const game2 = gameCenter.createNewGame(new Player("789", "Host2", false), questions);
        const player = new Player("45678", "Player", false);

        joinGame.execute(game1.getId(), player);

        expect(() =>
            joinGame.execute(game2.getId(), player)).toThrow(PlayerAlreadyInOtherGameError);
    });
});