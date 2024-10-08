import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const getPostgresConfig = (
  configService: ConfigService,
): PostgresConnectionOptions => ({
  type: 'postgres',
  url: configService.get<string>('DATABASE_URL'),
  port: configService.get<number>('DATABASE_PORT'),
  entities: [__dirname + '../../**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
  ssl: {
    rejectUnauthorized: false,
  },
});
