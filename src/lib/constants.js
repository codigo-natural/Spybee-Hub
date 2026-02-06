export const PROJECT_STATUS = {
  ACTIVE: "Activo",
  SUSPENDED: "Suspendido",
  INACTIVE: "Inactivo",
};

export const SORT_OPTIONS = {
  ALPHABETICAL: "alphabetical",
  INCIDENTS: "incidents",
  RFI: "rfi",
  TASKS: "tasks",
};

export const SORT_LABELS = [
  { value: SORT_OPTIONS.ALPHABETICAL, label: "Orden alfabético" },
  { value: SORT_OPTIONS.INCIDENTS, label: "Número de incidencias" },
  { value: SORT_OPTIONS.RFI, label: "Número de RFI" },
  { value: SORT_OPTIONS.TASKS, label: "Número de Tareas" },
];

export const PAGINATION = {
  ITEMS_PER_PAGE: 10,
};

export const SEARCH_DEBOUNCE_DELAY = 300;

export const PLAN_TYPES = {
  BIG: 'big',
  SMALL: 'small'
};

export const STATUS_TYPES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING_PAYMENT: 'pending_payment'
};

export const INCIDENT_TAGS = {
  RFI: 'RFI',
  TASK: 'TASK'
};

export const UI_CONSTANTS = {
  MAX_VISIBLE_AVATARS: 5,
  IMAGE_SIZE: {
    SMALL: 40,
    MEDIUM: 120,
    LARGE: 60
  },
  EMPTY_STATE_ICON_SIZE: 48
};

export const MAP_CONFIG = {
  DEFAULT_ZOOM: 2,
  SELECTED_ZOOM: 14,
  FLY_DURATION: 2500,
  MARKER_SIZE: {
    DEFAULT: 40,
    HOVER: 46
  },
  POPUP_OFFSET: 35,
  POPUP_MAX_WIDTH: '250px'
};
