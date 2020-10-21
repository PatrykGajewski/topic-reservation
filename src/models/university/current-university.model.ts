export interface CurrentUniversity {
  id: string,
  name: {
    full: string,
    shortcut: string,
  },
  icon: {
    link: string,
    added: boolean,
    href: string,
  },
  department: {
    id: string,
    name: {
      full: string,
      short: string,
    }
  },
  direction: {
    id: string,
    name: {
      full: string,
      shortcut: string,
    }
  },
  specialization: {
    id: string,
    name: {
      full: string,
      shortcut: string
    }
  } | null,
  location: {
    country: {
      id: string,
      name: string,
    },
  },
  startDate: string,
}
