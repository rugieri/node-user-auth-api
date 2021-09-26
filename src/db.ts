import { Pool } from 'pg';

const connectionString =
  'postgres://xxxxxxxxx:xxxxxxxxxxxxxxxxxx@motty.db.elephantsql.com/kdqbbfda';

const db = new Pool({ connectionString });

export default db;
