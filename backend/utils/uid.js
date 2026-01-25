export const generateUserUID = () => {
  return `USER-${Math.random().toString(36).slice(2, 8)}`;
};

export const generateBoardUID = (state) => {
  return `Ener-METER-${state}-${Date.now().toString().slice(-6)}`;
};
