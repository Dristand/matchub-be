import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {jwtGuard} from "../../helper/const";

@Injectable()
export class JwtAuthGuard extends AuthGuard(jwtGuard) {

}
