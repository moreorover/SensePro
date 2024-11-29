import { Badge } from "@/components/ui/badge";
import { DeviceShemaType } from "@/lib/apiSchema";

export const DeviceCard = (props: DeviceShemaType) => {
  return (
    <>
      <div className="flex flex-col space-y-2 p-4 border rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium">{props.name}</span>
          <Badge>{props.deviceType.name}</Badge>
        </div>
        <div className="text-sm text-gray-500">
          <p>MAC: {props.mac}</p>
          <p>IP: {props.ip}</p>
          <p>S/N: {props.serialNumber}</p>
        </div>
      </div>
    </>
  );
};
