/* eslint-disable prettier/prettier */
export const fadeIn = {
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

export const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
  },
};

export const pageAnimation = {
  hidden: {
    opacity: 0,
    y: 300,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.25,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const slideLeft = {
  hidden: {
    x: '-100vw',
  },
  show: {
    x: 0,
    transition: {
      duration: 0.25,
      when: 'beforeChildren',
      staggerChildren: 0.25,
    },
  },
};

export const slideUp = {
  hidden: {
    y: '50vh',
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      when: 'beforeChildren',
      staggerChildren: 1,
    },
  },
};

export const slideRight = {
  hidden: {
    x: '100vw',
  },
  show: {
    x: 0,
    transition: {
      duration: 0.25,
      when: 'beforeChildren',
      staggerChildren: 0.25,
    },
  },
};
