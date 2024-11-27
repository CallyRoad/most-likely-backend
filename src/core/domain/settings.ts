export enum SettingsId {
    USER_ID = 5,
    GAME_ID = 8
}

export enum SettingsGame {
    MIN_PLAYERS = 2,
    MAX_PLAYERS = 10,
    MIN_QUESTIONS = 5,
}

export enum GameState {
    WAITING= "waiting_for_players",
    IN_PROGRESS= "in_progress",
    FINISHED= "finished",

}

export enum RegEx {
    PASSWORD="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
}


