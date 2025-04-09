import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UserEntity } from "src/domain/entities/user.entity";

type RequestWithUser = Request & { user: UserEntity };

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: RequestWithUser, res: Response, next: NextFunction) {
    const token = req.cookies['nt.token'];

    if (!token) {
        return res.status(401).json({ message: "usuário não autorizado" });
      }
    try {
        const decoded = verify(token, process.env.JWT_SECRET || "01111");
        
        req.user = decoded as UserEntity;

        return next();
    } catch (error) {
      return res.status(401).json({ message: "usuário não autorizado" });
    }
  }
}
