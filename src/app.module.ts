import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma-service';
import { UserModule } from './modules/user.module';
import { ContractModule } from './modules/contract.module';
import { NoteModule } from './modules/note.module';
import { AuthModule } from './modules/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './middlewares/role.guard';
import { SecurityModule } from './modules/security.module';


@Module({
  imports: [
    UserModule,
    ContractModule,
    NoteModule,
    AuthModule,
    SecurityModule
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
