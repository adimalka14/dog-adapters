import app from './app';
import { PORT } from './utils/env-var';

app.listen(PORT, () => {
    console.log(`Server started on: http://localhost:${PORT}`);
});
