import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma-service';
import { RolesGuard } from './middlewares/role.guard';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})

export class AppModule {}
