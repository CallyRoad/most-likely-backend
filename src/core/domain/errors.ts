// Nickname errors
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

//Registration errors

export class EmptyEmailError extends Error {
    constructor() {
        super("An email must be provided");
    }
}

export class EmailAlreadyExists extends Error {
    constructor() {
        super("Email already exists");
    }
}

export class InvalidEmailFormatError extends Error {
    constructor() {
        super("Invalid email format");
    }
}

export class EmptyPasswordError extends Error {
    constructor() {
        super("A password must be provided");
    }
}

export class WeakPasswordError extends Error {
    constructor() {
        super("Password must contain at least 8 characters, including uppercase, lowercase, number and special character (@$!%*?&)");
    }
}

// Game errors

export class GameAlreadyExists extends Error {
    constructor() {
        super("Game already exists");
    }
}

export class NotEnoughPlayerError extends Error {
    constructor() {
        super("Not enough players to start the game");
    }
}

export class GameFullError extends Error {
    constructor() {
        super("Number of players allowed is full");
    }
}

export class GameAlreadyStartedError extends Error {
    constructor() {
        super("Game already started");
    }
}