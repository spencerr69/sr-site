let diving = false;
let timer: ReturnType<typeof setTimeout> | undefined;

export const exitSwoop = {
  start: () => {
    diving = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      diving = false;
    }, 4000);
  },
  reset: () => {
    diving = false;
    clearTimeout(timer);
  },
  isDiving: () => diving,
};
