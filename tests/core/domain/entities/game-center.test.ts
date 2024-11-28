import {Player} from "@/core/domain/entities/player";
import {Game} from "@/core/domain/entities/game";
import {GameCenter} from "@/core/domain/entities/game-center";
import {Question} from "@/core/domain/entities/questions";
import {getRandomId} from "@/core/domain/helpers/generateId";
import {SettingsId} from "@/core/domain/settings";

describe("GameCenter entity", () => {
    let gameCenter: GameCenter;
    let questions: Question[];

    const hostPlayer = new Player("12345", "Host", false);

    beforeEach(() => {
       GameCenter.resetInstance();
       gameCenter = GameCenter.getInstance();

       questions = [
           new Question(getRandomId(SettingsId.QUESTION_ID), "How have the most...", true),
           new Question(getRandomId(SettingsId.QUESTION_ID), "How have the most...", true),
           new Question(getRandomId(SettingsId.QUESTION_ID), "How have the most...", true),
           new Question(getRandomId(SettingsId.QUESTION_ID), "How have the most...", true),
           new Question(getRandomId(SettingsId.QUESTION_ID), "How have the most...", true)
       ];
    });

    it("should create a new game with questions",() => {
        const newGame = gameCenter.createNewGame(hostPlayer, questions);

        expect(newGame).toBeInstanceOf(Game);
        expect(newGame.getHost()).toBeDefined();
        expect(newGame.getQuestionList()).toEqual(questions);
        expect(newGame.getCurrentQuestion()).toBe(questions[0]);
        expect(gameCenter.getWaitingGames()[0]).toBe(newGame);
        expect(gameCenter.getWaitingGames()).toHaveLength(1);
    });

    it("should find a specific game", () => {
        const game = gameCenter.createNewGame(hostPlayer, questions);
        expect(gameCenter.findGame(game.getId())).toBeDefined();
    });

    it("should delete the game", () => {
        const game = gameCenter.createNewGame(hostPlayer, questions);

        expect(gameCenter.getWaitingGames()).toHaveLength(1);

        gameCenter.removeGame(game.getId());

        expect(gameCenter.getWaitingGames()).toHaveLength(0);
        expect(gameCenter.findGame(game.getId())).toBeUndefined();
    });
});