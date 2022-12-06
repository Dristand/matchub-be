import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {LocalStrategy} from "./strategy/local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../helper/const";
import {JwtStrategy} from "./strategy/jwt.strategy";

@Module({
  imports: [
      UsersModule,
      PassportModule,
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '60s'},
      })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
