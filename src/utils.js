export const colors = {
  newbie: "rgb(178, 178, 178)",
  pupil: "rgb(82, 255, 186)",
  specialist: "#32ceff",
  expert: "#001bff",
  candidate: "#C74EAD",
  master: "#FFA726",
  grandmaster: "#FF1208",
};

export const dynamicStyleRating = (rating) => {
  if (rating >= 2400) return colors.grandmaster;
  if (rating >= 2100) return colors.master;
  if (rating >= 1900) return colors.candidate;
  if (rating >= 1600) return colors.expert;
  if (rating >= 1400) return colors.specialist;
  if (rating >= 1200) return colors.pupil;
  return colors.newbie;
};
