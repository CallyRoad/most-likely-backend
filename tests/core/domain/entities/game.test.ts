import {SettingsId, SettingsGame} from "@/core/domain/settings";
import {GameAlreadyStartedError, GameFullError, NotEnoughPlayerError} from "@/core/domain/errors";
import {Game} from "@/core/domain/entities/game";
import {Player} from "@/core/domain/entities/player";

describe("Game entity", () => {
   it("should create a new game with the host as the first player", () => {
       const hostPlayer = new Player("12345", "Host", false);
       const gameId = "12345678";
       const game = new Game(gameId, hostPlayer);

      expect(game).toBeInstanceOf(Game);
      expect(game.getId()).toHaveLength(SettingsId.GAME_ID);
      expect(game.getPlayersList()).toHaveLength(1);
      expect(game.getPlayer(hostPlayer.getId())).toBe(hostPlayer);
      expect(game.getState()).toBe("waiting_for_players");
   });

   it("should correctly identify  the host player", () => {
       const hostPlayer = new Player("12345", "Host", false);
       const secondPlayer = new Player("12346", "secondPlayer", false);
       const gameId = "12345678";
       const game = new Game(gameId, hostPlayer);

       game.addPlayer(secondPlayer);

       expect(game.getHost()).toBe(hostPlayer);
       expect(game.getHost()).not.toBe(secondPlayer);
       expect(game.isHost(hostPlayer.getId())).toBe(true);
       expect(game.isHost(secondPlayer.getId())).toBe(false);
       expect(game.isHost("nonexistent-id")).toBe(false);

   });

   it("should allow to add player's in a game in waiting_for_player state", () => {
       const gameId = "12345678";
       const hostPlayer = new Player("12345", "Host", false);
       const game = new Game(gameId, hostPlayer);
       const playerJoined = new Player("32165", "SecondPlayer", false);

       game.addPlayer(playerJoined);

       expect(game.getState()).toBe("waiting_for_players");
       expect(game.getPlayersList()).toHaveLength(2); // hostPlayerId + newPlayer
       expect(game.getPlayersList()).toContain(hostPlayer);
       expect(game.getPlayersList()[1]).toBe(playerJoined);
   });

    it("should throw NotEnoughPlayerError when missing player to start the game (besides the host)", () => {
        const gameId = "12345678";
        const hostPlayer = new Player("12345", "Host", false);
        const game = new Game(gameId, hostPlayer);
        expect(() => game.startGame()).toThrow(NotEnoughPlayerError);
    });

    it("should not allow more than MAX_PLAYERS players ", () => {
        const gameId = "12345678";
        const hostPlayer = new Player("12345", "Host", false);
        const game = new Game(gameId, hostPlayer);

        for (let i = 0; i < SettingsGame.MAX_PLAYERS -1; i++) {
            game.addPlayer(new Player(`3216${i}`, `player ${i}`, false));
        }

        expect(() => game.addPlayer(new Player("32567","lastPlayer", false))).toThrow(GameFullError);
    });

    it("should not allow player when the game is start", () => {
        const gameId = "12345678";
        const hostPlayer = new Player("12345", "Host", false);
        const game = new Game(gameId, hostPlayer);
        const secondPlayer = new Player("32165", "SecondPlayer", false);
        const thirdPlayer = new Player("32166", "ThirdPlayer", false);

        game.addPlayer(secondPlayer);
        game.addPlayer(thirdPlayer)
        game.startGame();

        expect(game.getState()).toBe("in_progress");
        expect(() => game.addPlayer(new Player("65879","comingLatePlayer", false))).toThrow(GameAlreadyStartedError);
    })
});

