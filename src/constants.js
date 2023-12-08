export const Teams = {
  Cleaners: "Cleaners",
  Technicians: "Technicians",
  Salespeople: "Salespeople",
  Handypeople: "Handypeople",
};

export const TeamNames = {
  [Teams.Cleaners]: { singular: "cleaner", plural: "cleaners" },
  [Teams.Technicians]: { singular: "technician", plural: "technicians" },
  [Teams.Salespeople]: { singular: "salesperson", plural: "salespeople" },
  [Teams.Handypeople]: { singular: "handyperson", plural: "handypeople" },
};

export const JobCapacities = {
  [Teams.Cleaners]: 10,
  [Teams.Technicians]: 2,
  [Teams.Salespeople]: 6,
  [Teams.Handypeople]: 2,
};

export const START_HOURS = 16;
export const END_HOURS = 22;
export const SHIFT_HOURS = END_HOURS - START_HOURS;
export const SHIFT_SECONDS = SHIFT_HOURS * 60 * 60;
export const BLOCK_SECONDS = 900; // 15 minute blocks
export const SHIFT_BLOCKS = SHIFT_SECONDS / BLOCK_SECONDS; // 24 blocks per shift

export const dateFormat = new Intl.DateTimeFormat("en-DK", {
  weekday: "long",
  month: "long",
  day: "numeric",
});
