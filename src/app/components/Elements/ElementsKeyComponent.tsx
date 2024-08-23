import { pushAlert } from "@/app/redux/sampleSlice";
import { addElementsKeyService, getElementsKeyService, modifyElementsKeyService, removeElementsKeyService } from "@/app/service/Element.service";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Add, Copy, CopySuccess } from "iconsax-react";
import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";

const DraggableItem = ({ item, handleOpenModal }: { item: ItemType, handleOpenModal: any }) => {
  const [{ isDragging }, drag]: any = useDrag({
    type: "KEY_ITEM",
    item: { key: item.key, value: item?.defaultValue, label: item?.label },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleClickKey = (item: object, isPost: boolean) => {
    handleOpenModal(item, isPost)
  }

  return (
    <div
      ref={drag}
      onClick={() => handleClickKey(item, false)}
      className={`text-tiny mb-2 indent-6 line-clamp-1 hover:text-primary cursor-pointer selection:not-sr-only ${isDragging ? "opacity-50" : ""
        }`}
    >
      <div>
        {item.label}
      </div>
    </div>
  );
};

const ElementsKeyComponent = ({ eleKey, setEleKey }: { eleKey: ItemType[], setEleKey: any }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);

  const [isAddOrUpdate, setIsAddOrUpdate] = useState<boolean>();
  const handleOpenModal = (item: ItemType | null, isPost: boolean) => {
    setSelectedItem(item);
    setIsAddOrUpdate(isPost)
    onOpen();
  }
  return (
    <>
      <div className="mt-2">
        {eleKey?.map((item, index) => (
          <DraggableItem key={index + 1} item={item} handleOpenModal={handleOpenModal} />
        ))}
      </div>
      <div className="w-[90%] cursor-pointer mt-3 rounded-lg mx-auto flex justify-center items-center bg-default-100 text-sm text-foreground-400 py-1 px-2"
        onClick={() => handleOpenModal(null, true)}>
        <Add size={20} /> <span className="text-tiny ml-1">Add Key</span>
      </div>
      <SettingModal isOpen={isOpen} onOpenChange={onOpenChange} selectedItem={selectedItem} setEleKey={setEleKey} isAddOrUpdate={isAddOrUpdate} />
    </>
  );
};

const SettingModal = ({ isOpen, onOpenChange, selectedItem, setEleKey, isAddOrUpdate }: any) => {
  console.log({ isAddOrUpdate })

  const [request, setRequest] = useState({
    key: "",
    label: "",
    defaultValue: ""
  });
  useEffect(() => {
    setRequest((prev) => ({
      ...prev,
      key: selectedItem?.key,
      label: selectedItem?.label,
      defaultValue: selectedItem?.defaultValue
    }))
  }, [selectedItem])

  const [valid, setIsValid] = useState({
    status: false,
    msg: ""
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "key") {
      const isValid = /^[^\s-]+$/.test(value); //no spaces or hyphens
      if (!isValid) {
        setIsValid({ ...valid, status: true, msg: "Key cannot contain hyphens or spaces." })
        return;
      }
      else setIsValid({ ...valid, status: false, msg: "" })
    }
    setRequest((prev) => ({ ...prev, [name]: value }))
  }

  const dispatch = useDispatch()
  const handleUpdateOutputKey = (onClose: any, mode: string) => {
    // console.log({ request });
    if (!isAddOrUpdate) {
      if (mode === "Update") {
        modifyElementsKeyService(selectedItem.id, request).then((response) => {
          // console.log({ response });
          if (response.status == 200) {
            getElementsKeyService().then((res) => {
              setEleKey(res.data)
            });
            dispatch(
              pushAlert({
                open: true,
                type: "success",
                message: "Element key have been modified",
                duration: 1600,
              })
            );
          }
          else {
            dispatch(
              pushAlert({
                open: true,
                type: "error",
                message: "Error While Updating.",
                duration: 1600,
              })
            );
          }
          onClose()
        })
      }
      else if (mode === "Remove") {
        removeElementsKeyService(selectedItem.id).then((response) => {
          if (response.status == 204) {
            getElementsKeyService().then((res) => {
              setEleKey(res.data)
            });
            dispatch(
              pushAlert({
                open: true,
                type: "success",
                message: "Element key have been Deleted.",
                duration: 1600,
              })
            );
          }
          else {
            dispatch(
              pushAlert({
                open: true,
                type: "error",
                message: "Error While Deleting.",
                duration: 1600,
              })
            );
          }
          onClose()
        })
      }
    }
    else {
      addElementsKeyService(request).then((response) => {
        console.log({ response });
        if (response.status == 201) {
          getElementsKeyService().then((res) => {
            setEleKey(res.data)
          });
          dispatch(
            pushAlert({
              open: true,
              type: "success",
              message: "Element key have been Added",
              duration: 1600,
            })
          );
        }
        else {
          dispatch(
            pushAlert({
              open: true,
              type: "error",
              message: "Error While Adding.",
              duration: 1600,
            })
          );
        }
      })
    }
  }

  const [copy, setCopy] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(request.key)
      .then(() => {
        setCopy(true)
        setTimeout(() => {
          setCopy(false)
        }, 1000)
      })
      .catch(() => {
        alert('Failed to copy text.');
      });
  };

  return (
    < Modal isOpen={isOpen} onOpenChange={onOpenChange} >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{isAddOrUpdate && "Add"} Key Data Setting</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div className="w-full flex justify-between">
                  <div>
                    <label className="text-foreground-400 text-sm" htmlFor="key">Key</label>
                  </div>
                  <Input
                    onChange={handleChange}
                    type="text"
                    id="key"
                    name="key"
                    size="sm"
                    isInvalid={valid.status}
                    errorMessage={valid.msg}
                    defaultValue={selectedItem?.key}
                    className="max-w-[60%]" endContent={
                      <>
                        {
                          copy ?
                            <CopySuccess variant="Bold" size={16} className="text-gray-600" /> :
                            <Copy size={16} className="cursor-pointer text-gray-600" onClick={handleCopy} />
                        }
                      </>
                    } />
                </div>
                <div className="w-full flex justify-between">
                  <div>
                    <label className="text-foreground-400 text-sm" htmlFor="label">Label Name</label>
                  </div>
                  <Input
                    onChange={handleChange}
                    type="text"
                    id="label"
                    name="label"
                    size="sm"
                    defaultValue={selectedItem?.label}
                    className="max-w-[60%]" />
                </div>
                <div className="w-full flex justify-between">
                  <div>
                    <label className="text-foreground-400 text-sm" htmlFor="defaultValue">Default Value</label>
                  </div>
                  <Input
                    onChange={handleChange}
                    type="text"
                    id="defaultValue"
                    name="defaultValue"
                    size="sm"
                    defaultValue={selectedItem?.defaultValue}
                    className="max-w-[60%]" />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex justify-between w-full">
                {
                  !isAddOrUpdate ?
                    <Button size="sm" color="danger" variant="flat" onPress={() => handleUpdateOutputKey(onClose, "Remove")}>
                      Remove Key
                    </Button> : <div></div>
                }
                <Button size="sm" color="primary" onPress={() => handleUpdateOutputKey(onClose, "Update")}>
                  Save
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal >
  )
}

export default ElementsKeyComponent;
