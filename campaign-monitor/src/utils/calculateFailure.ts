//calculate the failure rate
export const calculateFailureRate = (sent: number, failed: number) => {
  if (sent + failed === 0) return 0;
  return failed / (sent + failed);
};