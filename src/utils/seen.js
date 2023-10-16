import { formatDistanceToNow, subDays } from "date-fns";

export default (DateTime) => {
  return formatDistanceToNow(subDays(new Date(DateTime), 0), new Date(), {
    addSuffix: true,
  });
};
