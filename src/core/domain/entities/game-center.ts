import {Player} from "@/core/domain/entities/player";
import {Game} from "@/core/domain/entities/game";
import {getRandomId} from "@/core/domain/helpers/generateId";
import {SettingsId} from "@/core/domain/settings";

export class GameCenter {
    private static instance: GameCenter;
    readonly gameMap: {
        [gameId: string]: Game;
    };

    constructor() {
        this.gameMap = {};
    }

    static getInstance(): GameCenter {
        if (!GameCenter.instance) {
            GameCenter.instance = new GameCenter();
        }
        return GameCenter.instance;
    };

    // resetInstance is here only for the GameEntity test
    static resetInstance(): void {
        GameCenter.instance = new GameCenter();
    };

    createNewGame(hostPlayer: Player): Game {
        const gameId = getRandomId(SettingsId.GAME_ID);
        const game = new Game(gameId, hostPlayer);
        this.gameMap[gameId] = game;
        return game;
    };

    findGame(gameId: string): Game | undefined {
        return this.gameMap[gameId];
    };

    removeGame(gameId: string): void {
        delete this.gameMap[gameId];
    };

    getWaitingGames(): Game[] {
        return Object.values(this.gameMap);
    };

    isPlayerInGame(playerId: string): boolean {
        return Object.values(this.gameMap).some(game => game.getPlayer(playerId) !== undefined);
    }
}