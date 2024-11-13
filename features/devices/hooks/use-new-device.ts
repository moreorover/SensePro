import { create } from "zustand";

type State = {
  isOpen: boolean;
  locationId?: string;
  groupId?: string;
  deviceTypeId: string;
};

type Actions = {
  onOpen: () => void;
  onClose: () => void;
  setLocationId: (locationId: string) => void;
  setGroupId: (groupId: string) => void;
  setDeviceTypeId: (deviceType: string) => void;
};

const initialState: State = {
  isOpen: false,
  locationId: undefined,
  deviceTypeId: "",
};

export const useNewDevice = create<State & Actions>((set) => ({
  ...initialState,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set(initialState),
  setLocationId: (locationId: string) => set({ locationId }),
  setGroupId: (groupId: string) => set({ groupId }),
  setDeviceTypeId: (deviceTypeId: string) => set({ deviceTypeId }),
}));
