import {EmptyQuestionError, LongQuestionError, ShortQuestionError} from "@/core/domain/errors";

export class Question {
    constructor(
        readonly id: string,
        readonly questionText: string,
        readonly isDefault: boolean,
        readonly createdByPlayerId?: string
    ) {
        this.validateQuestionText(questionText);
    }

    private validateQuestionText(text: string): void {
        if (!text || text.trim().length === 0) {
            throw new EmptyQuestionError();
        }
        if (text.length < 3) {
            throw new ShortQuestionError();
        }
        if (text.length > 200) {
            throw new LongQuestionError();
        }
    }

    getId(): string {
        return this.id;
    };

    getQuestionText(): string {
        return this.questionText;
    };

    getCreator(): string | undefined {
        return this.createdByPlayerId;
    };

    isDefaultQuestion(): boolean {
        return this.isDefault;
    };
}


