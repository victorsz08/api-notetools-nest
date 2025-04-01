import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma-service';
import { UserModule } from './modules/user.module';
import { ContractModule } from './modules/contract.module';
import { NoteModule } from './modules/note.module';
import { AuthModule } from './modules/auth.module';


@Module({
  imports: [
    UserModule,
    ContractModule,
    NoteModule,
    AuthModule
  ],
  providers: [PrismaService],
})

export class AppModule {}
