import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma-service';
import { UserModule } from './modules/user.module';
import { ContractModule } from './modules/contract.module';


@Module({
  imports: [
    UserModule,
    ContractModule
  ],
  providers: [PrismaService],
})

export class AppModule {}
