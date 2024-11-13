import { client } from "@/lib/hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

export const useGetDeviceBrands = () => {
  return useQuery({
    queryKey: ["deviceBrands"],
    queryFn: async () => {
      const response = await client.api.deviceBrands.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch deviceBrands");
      }

      return await response.json();
    },
  });
};

export const useGetDeviceBrand = (id?: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["deviceBrand", { id }],
    queryFn: async () => {
      const response = await client.api.deviceBrands[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch account");
      }

      return await response.json();
    },
  });
};

export const useCreateDeviceBrand = () => {
  type ResponseType = InferResponseType<typeof client.api.deviceBrands.$post>;
  type RequestType = InferRequestType<
    typeof client.api.deviceBrands.$post
  >["json"];

  const queryClient = useQueryClient();
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.deviceBrands.$post({ json });
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("DeviceBrand created");
      queryClient.invalidateQueries({ queryKey: ["deviceBrands"] });
    },
    onError: () => {
      toast.error("Failed to create deviceBrand");
    },
  });
};

export const useUpdateDeviceBrand = (id?: string) => {
  type ResponseType = InferResponseType<
    (typeof client.api.deviceBrands)[":id"]["$patch"]
  >;
  type RequestType = InferRequestType<
    (typeof client.api.deviceBrands)[":id"]["$patch"]
  >["json"];
  const queryClient = useQueryClient();
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.deviceBrands[":id"]["$patch"]({
        param: { id },
        json,
      });
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("DeviceBrand updated");
      queryClient.invalidateQueries({ queryKey: ["deviceBrand", { id }] });
      queryClient.invalidateQueries({ queryKey: ["deviceBrands"] });
    },
    onError: () => {
      toast.error("Failed to update deviceBrand");
    },
  });
};

export const useDeleteDeviceBrand = (id?: string) => {
  type ResponseType = InferResponseType<
    (typeof client.api.deviceBrands)[":id"]["$delete"]
  >;
  const queryClient = useQueryClient();
  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.deviceBrands[":id"]["$delete"]({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Response not ok!");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("DeviceBrand deleted");
      queryClient.invalidateQueries({ queryKey: ["deviceBrands"] });
    },
    onError: () => {
      toast.error("Failed to delete deviceBrand");
    },
  });
};
