import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNewDevice } from "@/features/devices/hooks/use-new-device";
import { DeviceType } from "@prisma/client";
import { Plus } from "lucide-react";

type Props = {
  groupId: string;
  locationId: string;
  deviceTypes: DeviceType[];
};

export const GroupAddDeviceButton = ({
  groupId,
  locationId,
  deviceTypes,
}: Props) => {
  const newDevice = useNewDevice();

  const openNewDevice = (deviceTypeId: string) => {
    newDevice.setLocationId(locationId);
    newDevice.setGroupId(groupId);
    newDevice.setDeviceTypeId(deviceTypeId);
    newDevice.onOpen();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline">
            <Plus className="size-4" />
            Add new device
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {deviceTypes.map((deviceType) => {
            return (
              <DropdownMenuItem
                key={deviceType.id}
                onClick={() => openNewDevice(deviceType.id)}
                className="flex items-center p-2 cursor-pointer transition-colors hover:bg-accent"
              >
                {deviceType.name}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
