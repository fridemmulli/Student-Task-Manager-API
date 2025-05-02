import { createNestServer } from '../src/main';

let cachedApp: any;

export default async function handler(req: any, res: any) {
  if (!cachedApp) {
    const expressApp = await createNestServer();
    cachedApp = expressApp;
  }
  return cachedApp(req, res);
}
