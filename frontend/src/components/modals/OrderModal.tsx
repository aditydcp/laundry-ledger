import { useEffect, useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Switch } from "../ui/switch"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { OrderForm } from "@/types/OrderForm"
import useWardrobe from "@/hooks/useWardrobe"
import { ClothingItem } from "@/types/ClothingItem"

export default function OrderModal(props: any) {
  const { wardrobe: availableItems } = useWardrobe()
  const { item: order, setOrders, setIsModalOpen, editItem } = props
  const defaultFormState: OrderForm = {
    laundromartName: "",
    completed: false,
    items: []
  }
  const [formState, setFormState] = useState(defaultFormState)

  useEffect(() => {
    if (order) {
      setFormState({
        laundromartName: order.name,
        completed: order.completed,
        items: order.items
      })
    } else {
      setFormState(defaultFormState)
    }
  }, [order])

  const handleCompletedChange = (value: boolean) => {
    setFormState({ ...formState, completed: value })
  }

  const handleItemToggle = (item: any) => {
    setFormState((prevState: any) => {
      const items = prevState.items.includes(item)
        ? prevState.items.filter((i: any) => i !== item)
        : [...prevState.items, item]
      return { ...prevState, items }
    })
  }

  const createItem = async (item: OrderForm) => {
    let { laundromartName, ...data } = item
    const newItem = { name: laundromartName, ...data}
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newItem)
    })
    const orderResponse = await response.json()
    if (!orderResponse) return orderResponse

    newItem.items.forEach((clothing: any) => {
      let orderDetail = { order_id: orderResponse.ID, clothing_id: clothing.ID }
      fetch(`${import.meta.env.VITE_BASE_URL}/api/orderdetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(orderDetail)
      }).then((response) => {
        response.json().then((data) => {
          if (!data) {
            console.log("Error saving order details")
            return data
          }
        })
      })
    })

    return orderResponse
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let { laundromartName, ...form } = formState
    if (order) {
      let newItem = {
        id: order.ID,
        name: laundromartName,
        ...form
      }
      await editItem(newItem)
    } else {
      let newItem = {
        name: laundromartName,
        ...form
      }
      console.log(newItem)
      let data = await createItem(formState)
      if (data)
        setOrders((prevState: any) => [...prevState, {...newItem, is_complete: form.completed}]);
      else console.error("Error saving data")
    }

    setIsModalOpen(false);
  };

  return (
    <div className="fixed p-12 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">{order ? "Edit Order" : "Create New Order"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Laundromart Name</Label>
            <Input
              id="name"
              type="text"
              value={formState.laundromartName}
              onChange={(e) => setFormState({ ...formState, laundromartName: e.target.value })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              required
            />
          </div>

          <div className="mb-4 flex gap-2">
            <Switch
              id="completed"
              checked={formState.completed}
              onCheckedChange={handleCompletedChange}
              className="p-0"
            />
            <Label htmlFor="completed" className="text-sm font-medium text-gray-700">Completed</Label>
          </div>

          <div className="mb-4">
            <Label className="block text-sm font-medium text-gray-700">Items</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {formState.items.length > 0
                    ? formState.items.map(item => item.name).join(", ")
                    : "Select Items"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full" align="start">
                {availableItems.map((item: any) => (
                  <DropdownMenuCheckboxItem
                    key={item.ID}
                    checked={formState.items.map(item => item.ID).includes(item.ID)} // ignore type error, this still works
                    onCheckedChange={() => handleItemToggle(item)}
                  >
                    {item.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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