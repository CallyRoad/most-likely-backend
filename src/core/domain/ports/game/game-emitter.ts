import {Player} from "@/core/domain/entities/player";

export interface GameEmitter {
    emit(playerId: string, event: string, payload: Record<string, unknown>): void;
    emitAll(gameId: string, event: string, payload: Record<string, unknown>): void;
    emitPlayerJoined(gameId: string, player: Player): void;
    emitVoteReceived(gameId: string, fromPlayer: string, toPlayer: string): void;
}