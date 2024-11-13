"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useGetDeviceBrands } from "@/features/deviceBrands/useDeviceBrandsApi";
import * as useNewDevice from "@/features/devices/hooks/use-new-device";
import { deviceForm } from "@/lib/apiSchema";
import { z } from "zod";
import { useCreateDevice } from "../useDevicesApi";
import { DeviceForm } from "./devices-form";

type FormValues = z.input<typeof deviceForm>;

export const NewDeviceSheet = () => {
  const { isOpen, onClose, locationId, groupId, deviceTypeId } =
    useNewDevice.useNewDevice();
  const mutation = useCreateDevice();

  const deviceBrandsQuery = useGetDeviceBrands();

  const isLoading =
    deviceBrandsQuery.isLoading || deviceBrandsQuery.isRefetching;

  const deviceBrands = deviceBrandsQuery.data ? deviceBrandsQuery.data : [];

  const onSubmit = (values: FormValues) => {
    mutation.mutate(
      {
        ...values,
        locationId,
        groupId,
        deviceTypeId,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Device</SheetTitle>
          <SheetDescription>
            Create a new customer location device.
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <DeviceForm
            onSubmit={onSubmit}
            disabled={mutation.isPending}
            defaultValues={{
              name: "",
              mac: "",
              ip: "",
              pin: 0,
              serialNumber: "",
              deviceBrandId: "",
            }}
            deviceBrandOptions={deviceBrands}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
