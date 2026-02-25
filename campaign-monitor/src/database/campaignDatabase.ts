import * as SQLite from "expo-sqlite";

//get the campaign type from types
import { Campaign } from "../types/campaign";

//Opens (or creates if not exists) a local SQLite database to cache for offline access
const db = SQLite.openDatabaseSync("campaigns.db");

//Initializes the local database, create campaign table if do not exists
export const initDatabase = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS campaigns (
      id TEXT PRIMARY KEY NOT NULL,
      tenantId TEXT,
      name TEXT,
      sent INTEGER,
      failed INTEGER,
      pending INTEGER,
      updatedAt TEXT
    );
  `);
};

//save the data into db from the json datafile
// if data with same primary key  will update the new record
// if data is not existed will insert into table
export const saveCampaignsToDB = async (campaigns: Campaign[]) => {
  for (const c of campaigns) {
    await db.runAsync(
      `INSERT OR REPLACE INTO campaigns 
       (id, tenantId, name, sent, failed, pending,updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [c.id, c.tenantId, c.name, c.sent, c.failed, c.pending, c.updatedAt],
    );
  }
};

//load data from db to display for offline support
export const loadCampaignsFromDB = async (): Promise<Campaign[]> => {
  const result = await db.getAllAsync<Campaign>("SELECT * FROM campaigns");
  return result;
};
