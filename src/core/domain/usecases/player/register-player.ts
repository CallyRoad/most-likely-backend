import {RegisteredPlayerRepository} from "@/core/domain/ports/player/player-repository";
import {Player} from "@/core/domain/entities/player";
import {EmailAlreadyExists} from "@/core/domain/errors";
import {getRandomId} from "@/core/domain/helpers/generateId";
import {SettingsId} from "@/core/domain/settings";

export class RegisterPlayerUseCase{
    constructor(
        private readonly registeredPlayerRepository: RegisteredPlayerRepository,
    ) {}

    async execute(nickname: string, email: string, password: string): Promise<Player> {

        const existingPlayer = await this.registeredPlayerRepository.getByEmail(email);

        if (existingPlayer) {
            throw new EmailAlreadyExists();
        }

        const player = new Player(getRandomId(SettingsId.USER_ID), nickname, true, email, password);

        await this.registeredPlayerRepository.save(player);

        return player;
    }
}

