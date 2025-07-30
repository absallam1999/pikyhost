import express from 'express';
import sectionRoutes from './Routes/Sections.Routes';
import adminPasswordRoutes from './Routes/Admin.Routes';
import itemsRouter from './Routes/Items.Routes';
import btnsRouter from './Routes/btns.routes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

const corsOptions = {
  origin: "https://landing.pikyhost.com",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/admin', adminPasswordRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/items', itemsRouter);
app.use('/api/btns', btnsRouter);

app.get('/', (_req, res) => {
  res.json({ success: true, message: 'API is running' });
});

export default app;
