declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string | undefined;
        }
    }
}
export {};