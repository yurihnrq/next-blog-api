export default class APIError extends Error {
  #status: number;

  constructor(status: number, message: string) {
    super(message);
    this.#status = status;
  }

  get status(): number {
    return this.#status;
  }
}
