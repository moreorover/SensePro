import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import * as useNewLocation from "@/features/locations/hooks/use-new-location";
import { updateLocationType } from "@/lib/apiSchema";
import { z } from "zod";
import { useCreateLocation } from "../useLocationsApi";
import { LocationForm } from "./locations-form";

type FormValues = z.input<typeof updateLocationType>;

export const NewLocationSheet = () => {
  const { isOpen, onClose, customerId } = useNewLocation.useNewLocations();
  const mutation = useCreateLocation();
  const onSubmit = (values: FormValues) => {
    mutation.mutate(
      {
        ...values,
        customerId,
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
          <SheetTitle>New Location</SheetTitle>
          <SheetDescription>Create a new customer location.</SheetDescription>
        </SheetHeader>
        <LocationForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            address: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
