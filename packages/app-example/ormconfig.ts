import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export = {
  type: 'sqlite',
  database: 'database/example.sqlite',
  synchronize: false,
  logging: false,
  entities: ['src/database/entities/**/*.entity.ts'],
  migrations: ['src/database/migrations/**/*.migration.ts'],
  subscribers: ['src/subscribers/**/*.subscriber.ts'],
  namingStrategy: new SnakeNamingStrategy(),
}
