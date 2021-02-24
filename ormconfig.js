const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;
// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
module.exports = {
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATA,
  synchronize: true,
  logging: true,
  entities: ['dist/entities/**.entity{.ts,.js}'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  namingStrategy: new SnakeNamingStrategy(),
  dropSchema: false,
};
