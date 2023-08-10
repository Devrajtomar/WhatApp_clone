const UpdatedAt = (DateTime) => {
  let date = DateTime.slice(0, 10);
  let today = new Date();
  let lastDate = new Date(date);
  today.setHours(0, 0, 0, 0);
  const gap = (today - lastDate) / (1000 * 60 * 60 * 24);

  const timeDifferenceInMinutes = gap * 60 * 24; // Calculate time difference in minutes

  if (timeDifferenceInMinutes < 1) {
    return "Just now";
  } else if (timeDifferenceInMinutes < 60) {
    return `${Math.floor(timeDifferenceInMinutes)} minute${
      Math.floor(timeDifferenceInMinutes) > 1 ? "s" : ""
    } ago`;
  } else if (timeDifferenceInMinutes < 1440) {
    return `${Math.floor(timeDifferenceInMinutes / 60)} hour${
      Math.floor(timeDifferenceInMinutes / 60) > 1 ? "s" : ""
    } ago`;
  } else if (timeDifferenceInMinutes < 43200) {
    return `${Math.floor(timeDifferenceInMinutes / 1440)} day${
      Math.floor(timeDifferenceInMinutes / 1440) > 1 ? "s" : ""
    } ago`;
  } else if (timeDifferenceInMinutes < 525600) {
    return `${Math.floor(timeDifferenceInMinutes / 43200)} month${
      Math.floor(timeDifferenceInMinutes / 43200) > 1 ? "s" : ""
    } ago`;
  } else {
    return "More than a year ago";
  }
};

export default UpdatedAt;
