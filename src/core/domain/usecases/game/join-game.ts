import {GameCenter} from "@/core/domain/entities/game-center";
import {Room} from "@/core/domain/ports/game/room";
import {
    GameHasNoHostError,
    GameNotFoundError,
    PlayerAlreadyInGameError, PlayerAlreadyInOtherGameError,
} from "@/core/domain/errors";
import {Player} from "@/core/domain/entities/player";

export class JoinGameUseCase {
    private readonly gameCenter: GameCenter;

    constructor(private readonly room: Room) {
        this.gameCenter = GameCenter.getInstance();
    };

    execute(gameId: string, player: Player): void {
        const game = this.gameCenter.findGame(gameId);

        if (!game) {
            throw new GameNotFoundError();
        }

        if (!game.getHost()) {
            throw new GameHasNoHostError();
        }

        if(game.getPlayer(player.getId())) {
            throw new PlayerAlreadyInGameError();
        }

        if(this.gameCenter.isPlayerInGame(player.getId())) {
            throw new PlayerAlreadyInOtherGameError();
        }

        game.addPlayer(player);

        this.room.joinRoom(gameId ,player);
    };
}