export class RedisError extends Error {
    constructor(
        public message: string,
        public code?: number
    ) {
        super();
        this.name = 'Redis Reply Error';
    }
}

export class VerbatimString extends String {
    constructor(
        public format: string,
        value: string
    ) {
        super(value);
    }
}