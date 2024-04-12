'use client';

import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { LockIcon } from "lucide-react";
import { set } from "react-hook-form";
import { decryptFile } from "@/utils/localFileHandler";
import toast from "react-hot-toast";

interface ModalAskPasswordProps {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: (open: boolean) => void;
    onPasswordSubmit: (password: string) => void;
    selectedFilePath: string;
}

const ModalAskPassword = (
    {
        isOpen,
        onOpen,
        onOpenChange,
        onPasswordSubmit,
        selectedFilePath
    }: ModalAskPasswordProps
) => {
    const [password, setPassword] = React.useState<string>("");
    const handleClose = () => {
        onOpenChange(false);
        decryptFile(selectedFilePath, password).then((res:any) => {
            toast.success(res);
        }).catch((error) => {
            toast.error(error.message);
        });
        setPassword("");
    };

    const handleSubmit = () => {
        onPasswordSubmit(password);
        handleClose();
    };

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
                            <ModalHeader className="flex gap-1 justify-center">Decryption</ModalHeader>
                            <ModalBody>
                                <Input
                                    endContent={
                                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    variant="bordered"
                                    value={password}
                                    onValueChange={setPassword}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={handleClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleSubmit}>
                                    Decrypt File
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalAskPassword;