import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma-service';
import { RolesGuard } from './middlewares/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './modules/user.module';
import { OrderModule } from './modules/order.module';
import { NoteModule } from './modules/note.module';
import { AuthModule } from './modules/auth.module';


@Module({
  imports: [
    UserModule,
    OrderModule,
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
