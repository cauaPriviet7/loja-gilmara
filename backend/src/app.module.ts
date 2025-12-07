import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // Boa prática para ler .env
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    // Carrega as variáveis de ambiente
    ConfigModule.forRoot(),

    // Configuração do Banco de Dados
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User], // Registra as tabelas
      synchronize: true, // ⚠️ Cria as tabelas automaticamente (apenas para dev)
      autoLoadEntities: true,
    }),

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
