import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// import * as path from 'path';
// import * as process from 'process';
// import { Config, PostgresConfig } from '../../configs/config.type';
import { PostgresService } from './postgres.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresService,
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService<Config>) => {
    //     const postgresConfig = configService.get<PostgresConfig>('postgres');
    //     return {
    //       type: 'postgres',
    //       host: postgresConfig.host,
    //       port: +postgresConfig.port,
    //       username: postgresConfig.user,
    //       password: postgresConfig.password,
    //       database: postgresConfig.dbName,
    //       entities: [
    //         path.join(
    //           process.cwd(),
    //           'dist',
    //           'src',
    //           'database',
    //           'entities',
    //           '*.entity.js',
    //         ),
    //       ],
    //       migrationsRun: true,
    //       synchronize: false,
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
  ],
  providers: [],
})
export class PostgresModule {}
