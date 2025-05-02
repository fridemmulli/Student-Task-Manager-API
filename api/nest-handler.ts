import { createNestServer } from '../src/main';

const handler = async (req: any, res: any) => {
    const app = await createNestServer();
    app(req, res); // jalankan Express
};

export default handler;
