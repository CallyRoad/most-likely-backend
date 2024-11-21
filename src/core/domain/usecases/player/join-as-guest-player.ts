import {GameEmitter} from "@/core/domain/ports/game/game-emitter";
import {Player} from "@/core/domain/entities/player";
import {getRandomId} from "@/core/domain/helpers/generateId";
import {SettingsId} from "@/core/domain/settings";

export class JoinAsGuestPlayerUseCase {
    constructor(
        private readonly gameEmitter: GameEmitter
    ) {}

    execute(gameId: string, nickname: string): Player {

        const player = new Player(getRandomId(SettingsId.USER_ID), nickname, false);

        this.gameEmitter.emitPlayerJoined(gameId, player);

        return player;
    }

}

