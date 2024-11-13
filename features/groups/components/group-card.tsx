"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDeviceTypes } from "@/features/deviceTypes/useDeviceTypesApi";
import { DeviceCard } from "@/features/devices/components/device-card";
import { GroupShemaType } from "@/lib/apiSchema";
import { GroupAddDeviceButton } from "./group-add-device-button";
import { GroupEditButton } from "./group-edit-button";

export const GroupCard = (props: GroupShemaType) => {
  const deviceTypesQuery = useGetDeviceTypes();
  const isLoading = deviceTypesQuery.isLoading;
  const deviceTypes = deviceTypesQuery.data ? deviceTypesQuery.data : [];
  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{props.name}</span>
              <div className="space-x-2">
                <GroupAddDeviceButton
                  key={props.id}
                  groupId={props.id}
                  locationId={props.locationId}
                  deviceTypes={deviceTypes}
                />
                <GroupEditButton
                  id={props.id}
                  deleteDisabled={props.devices.length > 0}
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {props.devices.map((device) => (
                <DeviceCard key={device.id} {...device} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
