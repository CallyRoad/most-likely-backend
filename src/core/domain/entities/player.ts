import {EmptyNicknameError, LongNicknameError, ShortNicknameError} from "@/core/domain/errors";

export class Player {
    private score: number = 0;

    constructor(
        private readonly id: string,
        private nickname: string
    ) {
        this.validateNickname(nickname);
    }

    private validateNickname(nickname : string): void {
        if (!nickname || nickname.trim().length === 0) {
            throw new EmptyNicknameError();
        }

        if (nickname.length < 3) {
            throw new ShortNicknameError();
        }

        if (nickname.length > 40) {
            throw new LongNicknameError();
        }
    };

    getId(): string {
        return this.id;
    };

    getNickname(): string {
        return this.nickname;
    };

    incrementScore(): number {
        return this.score += 1;
    };

    getScore(): number {
        return this.score;
    };
}
