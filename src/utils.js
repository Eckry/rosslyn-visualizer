export const colors = {
  newbie: { dark: "#80808008", light: "#808080" },
  pupil: { dark: "#99d34208", light: "#99D342" },
  apprentice: { dark: "#50A75008", light: "#50A750" },
  specialist: { dark: "#03A89E08", light: "#03A89E" },
  expert: { dark: "#0000FF08", light: "#0000FF" },
  candidate: { dark: "#AA00AA08", light: "#AA00AA" },
  master: { dark: "#FE951608", light: "#FE9516" },
  grandmaster: { dark: "#FF000008", light: "#FF0000" },
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
