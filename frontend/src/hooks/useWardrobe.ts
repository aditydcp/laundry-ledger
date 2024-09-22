import { ClothingItem } from "@/types/ClothingItem";
import { useEffect, useState } from "react";

const useWardrobe = () => {
  const defaultWardrobe: ClothingItem[] = []
  const [wardrobe, setWardrobe] = useState(defaultWardrobe);

  useEffect(() => {
    const fetchWardrobe = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_URL
        const token = localStorage.getItem("token")
        const response = await fetch(`${baseUrl}/api/clothings`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setWardrobe(data);
      } catch (error) {
        console.error('Error fetching wardrobe:', error)
      }
    }
    fetchWardrobe()
  }, [])

  return { wardrobe, setWardrobe };
}

export default useWardrobe