let diving = false;

export const exitSwoop = {
  start: () => {
    diving = true;
  },
  reset: () => {
    diving = false;
  },
  isDiving: () => diving,
};
