import {Question} from "@/core/domain/entities/questions";

export interface QuestionRepository {
    getRandomQuestions(count: number): Promise<Question[]>;
    getQuestionsByPlayerId(playerId: string): Promise<Question[]>;
}