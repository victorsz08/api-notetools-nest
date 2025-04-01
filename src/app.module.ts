import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma-service';
import { UserModule } from './modules/user.module';


@Module({
  imports: [
    UserModule
  ],
  providers: [PrismaService],
})

export class AppModule {}
