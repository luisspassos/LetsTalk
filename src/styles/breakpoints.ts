type Breakpoint = { splitted: [number, string]; value: string };

type Breakpoints = Record<'last' | 'sidebar', Breakpoint>;

function getValueJoined(obj: Breakpoint) {
  return obj.splitted.join('');
}

export const breakpoints: Breakpoints = {
  last: {
    splitted: [87.5, 'rem'],
    get value() {
      return getValueJoined(this);
    },
  },
  sidebar: {
    splitted: [50, 'rem'],
    get value() {
      return getValueJoined(this);
    },
  },
};
