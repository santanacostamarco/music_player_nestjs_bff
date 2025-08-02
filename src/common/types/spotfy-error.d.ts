namespace SpotfyErrorInterface {
  export interface Root {
    error?: Error;
  }

  export interface Error {
    status: number;
    message: string;
  }
}
