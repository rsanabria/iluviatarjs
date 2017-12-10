import { UserModelToken, secret } from "../../constants";
import {
  Component,
  HttpException,
  HttpStatus,
  Inject,
  Response
} from "@nestjs/common";
import { Model, Error } from "mongoose";
import { iUser } from "./user.schema";
import * as bcrypt from "bcrypt-nodejs";
import * as jwt from "jsonwebtoken";
import { Observable } from "rxjs/Observable";
const salt = bcrypt.genSaltSync(10);

@Component()
export class UserService {
  constructor(@Inject(UserModelToken) private readonly User: Model<iUser>) {}

  async getAll(): Promise<iUser[]> {
    return await this.User.find().exec();
  }

  async new(user: any): Promise<iUser> {
    user.password = bcrypt.hashSync(user.password, salt);
    const createdUser = new this.User(user);
    return await createdUser
      .save()
      .then()
      .catch(err => {
        throw new HttpException(err, 500);
      });
  }

  async login(u: any): Promise<Observable<any>> {
    const user: any = await this.User.findOne({ email: u.email })
      .lean()
      .exec();
    if (user != null) {
      const match = bcrypt.compareSync(u.password, user.password);
      if (match) {
        return Observable.of({
          user: { name: user.name, email: user.email },
          success: match,
          token: jwt.sign(user, secret, {
            expiresIn: "24h" // Expira en 24 horas
          })
        });
      } else {
        return Observable.throw({ succes: match, err: "Contraseña errónea" });
      }
    }
    return Observable.throw({ success: false, err: "Usuario no encontrado" });
  }
}
