import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../configs/configuration';
import { HealthModule } from './health/health.module';
import { PostgresModule } from './postgres/postgres.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UsersModule,
    HealthModule,
    PostgresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
