export class EmptyNicknameError extends Error {
    constructor() {
        super("Player nickname cannot be empty");
    }
}

export class ShortNicknameError extends Error {
    constructor() {
        super("Player name must be at least 3 characters");
    }
}

export class LongNicknameError extends Error {
    constructor() {
        super("Player name must not exceed 40 characters");
    }
}

