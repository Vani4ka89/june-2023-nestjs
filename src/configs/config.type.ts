export type Config = {
  app: AppConfig;
  postgres: PostgresConfig;
  redis: RedisConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type PostgresConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  dbName: string;
};

export type RedisConfig = {
  host: string;
  port: number;
  password: string;
};
