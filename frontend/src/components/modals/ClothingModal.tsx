import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ClothingForm } from "@/types/ClothingForm";

export default function ClothingModal(props: any) {
  const categories = ["Tops", "Bottoms", "Others"]

  const { item, setIsModalOpen } = props
  const defaultFormState: ClothingForm = { name: "", category: "Tops" }
  const [formState, setFormState] = useState(defaultFormState);

  useEffect(() => {
    if (item) {
      setFormState({ name: item.name, category: item.category });
    } else {
      setFormState(defaultFormState);
    }
  }, [item]);

  const handleCategoryChange = (value: string) => {
    setFormState({ ...formState, category: value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (item) {
      // Edit existing item logic
      console.log("Editing item", formState);
    } else {
      // Add new item logic
      console.log("Adding new item", formState);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">{item ? "Edit Clothing" : "Add New Clothing"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</Label>
            <Input
              id="name"
              type="text"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</Label>
            <Select
              value={formState.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="secondary"
              className="mr-4"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}