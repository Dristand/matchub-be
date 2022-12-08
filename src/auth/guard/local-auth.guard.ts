import {AuthGuard} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {localGuard} from "../../helper/const";

@Injectable()
export class LocalAuthGuard extends AuthGuard(localGuard) {

}