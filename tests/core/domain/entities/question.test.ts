import {Question} from "@/core/domain/entities/questions";
import {getRandomId} from "@/core/domain/helpers/generateId"
import {SettingsId} from "@/core/domain/settings";
import {Player} from "@/core/domain/entities/player";
import {EmptyQuestionError, LongQuestionError, ShortQuestionError} from "@/core/domain/errors";

describe("Question entity", () => {

    describe("should create question", () => {
        it("should create a new default question", async () => {
            const question = new Question(getRandomId(SettingsId.QUESTION_ID), "Question text here", true);

            expect(question.getQuestionText()).toEqual("Question text here");
            expect(question.getId()).toHaveLength(SettingsId.QUESTION_ID);
            expect(question.getCreator()).toBeUndefined();
            expect(question.isDefaultQuestion()).toBe(true);
        });

        it("should create a new question by player", async () => {
            const player = new Player("23456", "Player", true, "player@example.com", "Passw0rd!");
            const question = new Question("12345", "Question text here", false, player.getId());

            expect(question.getCreator()).toEqual(player.getId());
        });
    });

    describe("question validation", () => {
        it("should throw EmptyQuestionError", async () => {
            expect(() => new Question(getRandomId(SettingsId.QUESTION_ID), "", true)).toThrow(EmptyQuestionError);
        });

        it("should throw ShortQuestionError if the question is too short", async () => {
            expect(() => new Question(getRandomId(SettingsId.QUESTION_ID), "ab", true)).toThrow(ShortQuestionError);
        });

        it("should throw LongQuestionError if the question is too long", async () => {
            const longQuestion = "a".repeat(201);
            expect(() => new Question(getRandomId(SettingsId.QUESTION_ID), longQuestion, true)).toThrow(LongQuestionError);
        });
    });
});