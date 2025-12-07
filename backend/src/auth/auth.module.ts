import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm'; // <--- Importante
import { User } from '../users/user.entity'; // <--- Importante
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // Habilita o uso da tabela User dentro deste módulo
    TypeOrmModule.forFeature([User]),

    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'SEGREDO_MUITO_FORTE_AQUI',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Removemos PrismaService daqui
  exports: [AuthService],
})
export class AuthModule {}
