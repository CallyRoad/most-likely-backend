import {RegisteredPlayerRepository} from "@/core/domain/ports/player/player-repository";
import {Player} from "@/core/domain/entities/player";
import {RegisterPlayerUseCase} from "@/core/domain/usecases/player/register-player";
import {SettingsId} from "@/core/domain/settings";
import {EmailAlreadyExists} from "@/core/domain/errors";

describe("RegisterPlayerUseCase", () => {
   let registeredPlayerRepository: jest.Mocked<RegisteredPlayerRepository>;
   let registerPlayer: RegisterPlayerUseCase;

   registeredPlayerRepository = {
       save: jest.fn(),
       getByEmail: jest.fn(),
       getById: jest.fn(),
       delete: jest.fn(),
   };

   beforeEach(() => {
       jest.clearAllMocks();

       registerPlayer = new RegisterPlayerUseCase(registeredPlayerRepository);
   });

   it("should be able to register a player", async () => {
       registeredPlayerRepository.getByEmail.mockResolvedValue(null);

       const nickname = "John";
       const email = "john@example.com";
       const password = "Password123?";

       const player =  await registerPlayer.execute(nickname, email, password);

       expect(registeredPlayerRepository.save).toHaveBeenCalledTimes(1);

       expect(player).toBeInstanceOf(Player);
       expect(player.getNickname()).toBe(nickname);
       expect(player.getId()).toHaveLength(SettingsId.USER_ID);
       expect(player.isPlayerRegistered()).toBe(true);
   });

   it("should throw EmailAlreadyExists", async () => {

       const existingPlayer = new Player("12345", "John", true, "john@example.com", "Password132?");

       registeredPlayerRepository.getByEmail.mockResolvedValue(existingPlayer);

       await expect(
           registerPlayer.execute("John", "john@example.com", "Password123?")
       ).rejects.toThrow(EmailAlreadyExists);

       expect(registeredPlayerRepository.save).not.toHaveBeenCalled();
   });
});