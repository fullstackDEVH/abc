export const StorageKey = {
  accessToken: "accessToken",
};

export type ModalModeType = "create" | "info" | "edit" | null;

export type CameraStatus = "ONLINE" | "OFFLINE";

export type ApiErrorMsg = {
  detail: string;
};

export const defaultImage = "/images/default-img.gif";

export const EventTypeList = [
  {
    id: "MANU01",
    name: "Intrusion detection",
    label: "Warning when a person comes into restrict zone",
  },
  {
    id: "MANU02",
    name: "Personal protective equipment PPE/Uniform compliance",
    label:
      "- Warning when a person is missing PPE/uniform \n\
    - Ensure the use of Personal Protective Equipment (PPE)/uniform when entering designated areas",
  },
  {
    id: "CM03",
    name: "CM03",
    label: "CM03",
  },
];

export const MenuAdmin = {
  DATA_TENANTS: [
    {
      name: "Tenant list",
      path: "/admin/tenants",
    },
    {
      name: "Account management",
      path: "#",
    },
  ],

  DATA_STAFF: [
    {
      name: "QA Team",
    },
    {
      name: "Events Checklist",
    },
  ],
};
