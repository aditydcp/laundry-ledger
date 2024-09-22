import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useState } from "react"
import TopsIcon from "@/assets/tops.svg"
import { EditIcon, PlusIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import ClothingModal from "@/components/modals/ClothingModal"
import useWardrobe from "@/hooks/useWardrobe"

export default function Wardrobe() {
  const { wardrobe: items, setWardrobe } = useWardrobe()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null)

  const openForm = (item: any = null) => {
    setSelectedItem(item)
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <div id="title" className="flex gap-4 items-end">
          <h2 className="scroll-m-20 text-4xl font-bold tracking-tight">
            My Wardrobe
          </h2>
          <span className="font-medium tracking-tight">
            Manage your clothing
          </span>
        </div>
        <div id="content">
          <div className="container px-4 py-6">
            {items ? 
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
              {items.map((item) => {
                const icon = TopsIcon // placeholder image
                return (
                  <Card key={item.id} className="border-0 rounded-lg shadow-lg">
                    <CardContent className="flex p-0 pt-2 items-center justify-center w-200 h-200">
                      <img
                        src={icon}
                        alt={item.name}
                        width={160}
                        height={160}
                        className="aspect-square opacity-50"
                      />
                    </CardContent>
                    <CardFooter className="justify-between p-4">
                      <div>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                      </div>
                      <Tooltip>
                        <TooltipTrigger
                          className="p-2 text-primary-foreground hover:text-primary hover:bg-primary-foreground transition-colors"
                          onClick={() => openForm(item)}
                        >
                          <EditIcon className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          Edit
                        </TooltipContent>
                      </Tooltip>
                    </CardFooter>
                  </Card>
                )
              })}
            </div> : "Nothing is in your wardrobe..." }
          </div>

          <Tooltip>
            <TooltipTrigger
              className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:text-primary hover:bg-primary-foreground transition-colors"
              onClick={() => openForm()}
            >
              <PlusIcon />
            </TooltipTrigger>
            <TooltipContent side="right">Add New Clothing</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {isModalOpen && (
        <ClothingModal
          item={selectedItem}
          setWardrobe={setWardrobe}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  )
}