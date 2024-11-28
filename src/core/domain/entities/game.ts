import {Player} from "@/core/domain/entities/player";
import {
    GameAlreadyStartedError,
    GameFullError,
    NotEnoughPlayerError,
    NotEnoughQuestionsError
} from "@/core/domain/errors";
import {GameState, SettingsGame} from "@/core/domain/settings";
import {Question} from "@/core/domain/entities/questions";

export class Game {
    private readonly playerList: Player[] = [];
    private questionList: Question[] = [];
    private state: GameState = GameState.WAITING;
    private currentQuestionIndex: number = 0;

    constructor(
        readonly id: string,
        hostPlayer: Player
    ) {
            this.addPlayer(hostPlayer);
    };

    getId(): string {
        return this.id;
    };

    getHost(): Player {
        return this.playerList[0];
    };

    isHost(playerId: string): boolean {
        return this.getHost()?.getId() === playerId;
    };

    getPlayer(playerId: string): Player | undefined{
        return this.playerList.find((player: Player) => player.id === playerId);
    };

    getPlayersList(): Player[] {
        return this.playerList;
    };

    // SetQuestions() will be use for initiate Question
    setQuestions(questions: Question[]): void {
        if (this.state !== GameState.WAITING) {
            throw new GameAlreadyStartedError();
        }
        this.questionList = questions;
    };

    getQuestionList(): Question[] {
        return this.questionList;
    };

    getCurrentQuestion(): Question | undefined {
        return this.questionList[this.currentQuestionIndex];
    };

    nextQuestion(): Question | undefined {
        if (this.currentQuestionIndex < this.questionList.length - 1) {
            this.currentQuestionIndex++;
            return this.getCurrentQuestion();
        }
        return undefined;
    };

    hasNextQuestion(): boolean {
        return this.currentQuestionIndex < this.questionList.length - 1;
    };

    getState(): GameState {
        return this.state;
    };

    addPlayer(player: Player): void {
        if (this.state === GameState.IN_PROGRESS) {
            throw new GameAlreadyStartedError();
        }

        if (this.playerList.length >= SettingsGame.MAX_PLAYERS) {
            throw new GameFullError();
        }

        this.playerList.push(player);
    };

    startGame(): void {
        if (this.playerList.length === 1) {
            throw new NotEnoughPlayerError();
        }

        if (this.questionList.length < SettingsGame.MIN_QUESTIONS) {
            throw new NotEnoughQuestionsError();
        }

        this.state = GameState.IN_PROGRESS;
    };
}