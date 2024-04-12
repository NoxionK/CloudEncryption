'use client';

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";

interface ModalConfirmProps {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: (open: boolean) => void;
}

const ModalConfirm = (
    {
        isOpen,
        onOpen,
        onOpenChange
    }: ModalConfirmProps
) => {

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex gap-1 justify-center">Caution</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this file?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalConfirm;