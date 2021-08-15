// eslint-disable-next-line @typescript-eslint/no-var-requires
const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;
module.exports = {
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATA,
  synchronize: process.env.DB_SYNC === 'true',
  logging: true,
  entities: ['dist/entities/**.entity{.ts,.js}'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  migrations: ['dist/migration/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
  dropSchema: false,
};
