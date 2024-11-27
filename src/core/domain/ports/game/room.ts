import {Player} from "@/core/domain/entities/player";

export interface Room {
    joinRoom(gameId: string, player: Player): void;
    leaveRoom(gameId: string, playerId: string): void;
}