declare module "express-async-errors" {
  import { Request, Response, NextFunction } from "express";

  type AsyncHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;

  function wrap(handler: AsyncHandler): AsyncHandler;
  function after(
    handler: AsyncHandler,
    errorCallback?: (err: Error, req: Request, res: Response, next: NextFunction) => void
  ): AsyncHandler;
}

// require express-async-erors할때 아래 오류 떠서 이거 작성해주니 해결됨.(@types 설치도 안됐음)
// Could not find a declaration file for module 'express-async-errors'. 
// 'c:/Users/PC/Desktop/web/javascript/React/bulletin-react/node_modules/express-async-errors/index.js' implicitly has an 'any' type.
//   Try `npm i --save-dev @types/express-async-errors` 
//   if it exists or add a new declaration (.d.ts) file containing `declare module 'express-async-errors';`