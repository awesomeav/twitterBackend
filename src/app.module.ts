import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppConfigModule } from './infrastructure/config.module';
import { AppConfigService } from './infrastructure/config.service';
import { TweetsModule } from './tweets/tweets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        const options: MongooseModuleOptions = {
          uri: appConfigService.mongoDbUri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
        return options;
      },
    }),
    AuthModule,
    TweetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
