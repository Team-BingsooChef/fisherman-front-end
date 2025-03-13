import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { api } from "../config/axios";

export default function TestPage() {
  const [fishingSpotId, setFishingSpotId] = useState<string | null>(null);
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiaWF0IjoxNzQxNjgwMTc3LCJleHAiOjE3NDQyNzIxNzd9.Yb4hKpALzMowp5TVCynqs1L_8mA_8aMTH3esKuNZ__4";

  const queryFishingSpot = async () => {
    try {
      const res = await api.get(`/fishing-spots/mine`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFishingSpotId(res.data); // 상태 업데이트
    } catch (error) {
      console.error("Error fetching fishing spot:", error);
      setFishingSpotId("Error fetching data");
    }
  };

  return (
    <div>
      <Button onClick={queryFishingSpot}>fishing spot</Button>
      <div>
        {fishingSpotId ? `Fishing Spot ID: ${fishingSpotId}` : "No data yet"}
      </div>
    </div>
  );
}
