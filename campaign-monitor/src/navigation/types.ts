// navigation/types.ts
import { Campaign } from "../types/campaign";
//Defines the navigation parameter types for the root stack.
export type RootStackParamList = {
  Biometrics: undefined;
  Dashboard: undefined;
  // Receives a full Campaign object to avoid refetching
  CampaignDetail: { campaign: Campaign };
  // Receives dynamic notification content entered by the user.
  PushPreview: {
    title: string;
    body: string;
  };
};
