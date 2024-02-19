import { Request } from 'express';
import { v4 as uuidV4 } from 'uuid';

import config from 'src/config';

export class HelperFileLoader {
  public customFileName(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error, destination: string) => void,
  ) {
    cb(null, `${uuidV4()}.${file.originalname.split('.').slice(-1)}`);
  }
  public destinationPath(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error, destination: string) => void,
  ) {
    cb(null, config().publicPath);
  }
}
