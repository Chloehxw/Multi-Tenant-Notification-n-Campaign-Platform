import { useEffect, useState } from "react";
import { Campaign } from "../types/campaign";
import { fetchCampaigns } from "../services/campaignService";
import {
  initDatabase,
  saveCampaignsToDB,
  loadCampaignsFromDB,
} from "../database/campaignDatabase";

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [offline, setOffline] = useState(false);

  const loadCampaigns = async () => {
    setLoading(true);

    try {
      await initDatabase();

      // Try fetch the data from API
      const data = await fetchCampaigns();

      // Update state with fresh data
      setCampaigns(data);

      // Save data to SQLite
      await saveCampaignsToDB(data);

      //App is online
      setOffline(false);
    } catch (error) {
      //if error (offline) will fetch from db instead
      console.log("Network failed. Loading from SQLite...");

      // Load from DB instead
      const cachedData = await loadCampaignsFromDB();
      setCampaigns(cachedData);
      setOffline(true);
    } finally {
      setLoading(false);
    }
  };
  //Automatically load campaigns when component mounts.
  useEffect(() => {
    loadCampaigns();
  }, []);

  return {
    campaigns, //campaign list for UI rendering
    loading, //pull-to-refresh
    offline, //used to display offline banner
    refresh: loadCampaigns, //function to manually reload data
  };
};
