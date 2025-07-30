import app from './app';
import { initializeAppData } from './Seeding/index';

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`DB Host: ${process.env.DB_HOST}`);
  console.log(`DB Name: ${process.env.DB_NAME}`);
  await initializeAppData();
});
