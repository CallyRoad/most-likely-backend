import {Player} from "@/core/domain/entities/player";

export interface RegisteredPlayerRepository {
    getById(id: string): Promise<Player | null>,
    getByEmail(email: string): Promise<Player | null>,
    save(player: Player): Promise<void>,
    delete(id: string): Promise<void>
}