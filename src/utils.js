export const colors = {
  newbie: "#808080",
  pupil: "#99D342",
  apprentice: "#50A750",
  specialist: "#03A89E",
  expert: "#0000FF",
  candidate: "#AA00AA",
  master: "#FE9516",
  grandmaster: "#FF0000",
};

export const dynamicStyleRating = (rating) => {
  if (rating >= 2400) return colors.grandmaster;
  if (rating >= 2000) return colors.master;
  if (rating >= 1800) return colors.candidate;
  if (rating >= 1600) return colors.expert;
  if (rating >= 1400) return colors.specialist;
  if (rating >= 1200) return colors.apprentice;
  if (rating >= 1000) return colors.pupil;
  return colors.newbie;
};
