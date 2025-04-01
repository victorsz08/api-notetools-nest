import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma-service';
import { UserModule } from './modules/user.module';
import { ContractModule } from './modules/contract.module';
import { NoteModule } from './modules/note.module';
import { AuthModule } from './modules/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './middlewares/role.guard';


@Module({
  imports: [
    UserModule,
    ContractModule,
    NoteModule,
    AuthModule
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
