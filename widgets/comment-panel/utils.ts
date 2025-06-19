export const getAuthorAndDate = ({ author, created_at }: { author: string; created_at: string }) => {
  return `${author} – ${new Date(created_at).toLocaleString()}`;
};
