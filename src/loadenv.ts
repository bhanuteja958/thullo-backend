import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

import {default as dotenv} from 'dotenv';

dotenv.config({path: join(__dirname, '/.env')});