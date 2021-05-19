import './utils/logger';
import app from './routes/index';
import './models/index';

const port = process.env.PORT;

app.listen(port, () => global.logger.info(`Running on port ${port}`));
