declare namespace NodeJS {
	export interface ProcessEnv extends Dict<string> {
	  NODE_ENV?: string;
	  PORT?: string;
	  FRONT_ORIGIN?: string;
    SECRET_KEY?: string;
    DATABASE_URL?: string;
	}
}
