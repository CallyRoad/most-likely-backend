import {Question} from "@/core/domain/entities/questions";
import {getRandomId} from "@/core/domain/helpers/generateId"
import {SettingsId} from "@/core/domain/settings";
import {Player} from "@/core/domain/entities/player";

describe("Question entity", () => {

    it("should create a new default question", async () => {
       const question = new Question(getRandomId(SettingsId.QUESTION_ID), "Question text", true);

       expect(question.getQuestionText()).toEqual("Question text");
       expect(question.getId()).toHaveLength(SettingsId.QUESTION_ID);
       expect(question.getCreator()).toBeUndefined();
       expect(question.isDefaultQuestion()).toBe(true);
    });

    it("should create a new question by player", () => {
        const player = new Player("23456", "Player", true, "player@example.com", "Passw0rd!");
        const question = new Question("12345", "Question text", false, player.getId());

        expect(question.getCreator()).toEqual(player.getId());
    });
});