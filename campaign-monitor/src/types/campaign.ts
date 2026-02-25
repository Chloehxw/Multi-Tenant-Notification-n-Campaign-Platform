//campaign type
export type Campaign = {
  id: string;
  tenantId: string;
  name: string;
  sent: number;
  failed: number;
  pending: number;
  updatedAt: string;
};