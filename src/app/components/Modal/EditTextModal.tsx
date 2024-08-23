import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

export default function EditTextModal({ newTextValue, handleTextChange, handleTextSubmit, openEditText, setOpenEditText } : any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal isOpen={openEditText} >
        <ModalContent className="absolute z-[9999]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <div className="text-edit-container">
                  <Input
                    type="text"
                    value={newTextValue}
                    onChange={handleTextChange}
                    onBlur={handleTextSubmit}
                    autoFocus
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={()=>setOpenEditText(false)}>
                  Cancel
                </Button>
                <Button onClick={handleTextSubmit}>Save</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
