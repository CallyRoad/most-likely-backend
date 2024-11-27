import {Player} from "@/core/domain/entities/player";
import {GameAlreadyStartedError, GameFullError, NotEnoughPlayerError} from "@/core/domain/errors";
import {GameState, SettingsGame} from "@/core/domain/settings";

export class Game {
    private readonly playerList: Player[] = [];
    private state: GameState = GameState.WAITING;

    constructor(
        readonly id: string,
        hostPlayer: Player
    ) {
            this.addPlayer(hostPlayer);
    };

    getId(): string {
        return this.id;
    };

    getHost(): Player {
        return this.playerList[0];
    };

    isHost(playerId: string): boolean {
        return this.getHost()?.getId() === playerId;
    };

    getPlayer(playerId: string): Player | undefined{
        return this.playerList.find((player: Player) => player.id === playerId);
    };

    getPlayersList(): Player[] {
        return this.playerList;
    };

    getState(): GameState {
        return this.state;
    };

    addPlayer(player: Player): void {
        if (this.state === GameState.IN_PROGRESS) {
            throw new GameAlreadyStartedError();
        }

        if (this.playerList.length >= SettingsGame.MAX_PLAYERS) {
            throw new GameFullError();
        }

        this.playerList.push(player);
    };

    startGame(): void {
        if (this.playerList.length === 1) {
            throw new NotEnoughPlayerError();
        }
        this.state = GameState.IN_PROGRESS;
    };
}