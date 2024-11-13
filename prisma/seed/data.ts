import { faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";

faker.seed(628533);

export const deviceBrands = [
  { id: createId(), name: "Dahua" },
  { id: createId(), name: "Raspberry Pi" },
];

export const deviceTypes = [
  { id: createId(), name: "Controller" },
  { id: createId(), name: "Network Video Recorder" },
  { id: createId(), name: "CCTV Camera" },
  { id: createId(), name: "Detector" },
  { id: createId(), name: "Light Strip" },
];

export const customers = [
  { id: createId(), name: faker.person.fullName() },
  { id: createId(), name: faker.person.fullName() },
  { id: createId(), name: faker.person.fullName() },
  { id: createId(), name: faker.person.fullName() },
];

export const locations = [
  { address: faker.location.streetAddress() },
  { address: faker.location.streetAddress() },
  { address: faker.location.streetAddress() },
  { address: faker.location.streetAddress() },
  { address: faker.location.streetAddress() },
  { address: faker.location.streetAddress() },
];
