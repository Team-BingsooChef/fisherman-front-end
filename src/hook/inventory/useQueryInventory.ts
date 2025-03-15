import {
  queryMyInventory,
  MyInventoryResponse,
} from "../../api/inventory/apis";
import { useQuery } from "@tanstack/react-query";

export const useQueryInventory = () => {
  const { data, error } = useQuery<MyInventoryResponse, Error>({
    queryKey: ["myInventory"],
    queryFn: queryMyInventory,
  });

  return { data, error };
};
