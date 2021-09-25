import { Pool } from 'pg';

const connectionString =
  'postgres://kdqbbfda:ud3Xuvij7d1TPStdzzEyLh9jWZP-ikG-@motty.db.elephantsql.com/kdqbbfda';

const db = new Pool({ connectionString });

export default db;
