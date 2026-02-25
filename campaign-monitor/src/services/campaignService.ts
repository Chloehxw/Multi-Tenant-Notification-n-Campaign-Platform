import campaigns from "../data/campaign.json";
import { Campaign } from "../types/campaign";

//Simulates API call
export const fetchCampaigns = async (): Promise<Campaign[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const simulateOffline = false; // change to true to simulate

      if (simulateOffline) {
        reject(new Error("Network error"));
      } else {
        resolve(campaigns as Campaign[]);
      }
    }, 1000);
  });
};
