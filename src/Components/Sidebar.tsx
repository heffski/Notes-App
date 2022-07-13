import { Button, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import { 
    Box, 
    Flex, 
    VStack, 
    HStack, 
    Text,
    Heading,
    Spacer,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure, 
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon, DeleteIcon, SmallAddIcon } from '@chakra-ui/icons'

interface SidebarProps {
    notes: string[]
    currentNote: any
    setCurrentNoteId: any
    deleteNote: any
    newNote: any
}

export default function Sidebar(props: SidebarProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const noteElements = props.notes.map((note: any) => (
        <Box key={note.id}>
            <Flex 
                alignItems={"center"}
                px="2"
                pt="2"
                pb="2"
                bg={ note.id === props.currentNote.id ? "cyan" : ""}                
                onClick={() => props.setCurrentNoteId(note.id)}>
                <Heading size="sm">{note.body.split("\n")[0]}</Heading>
                <Spacer />
                <Button 
                    onClick={(event) => props.deleteNote(event, note.id)}
                    >
                    <DeleteIcon />
                </Button>
            </Flex>
        </Box>
    ))
    
    return (
        <>
            <Flex width={"full"}>
                <Button rightIcon={<HamburgerIcon />} colorScheme={'blue'} onClick={onOpen}>Notes</Button>
                <Drawer placement={'left'} size={'xs'} onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                            <DrawerHeader borderBottomWidth='1px'>
                                <HStack>
                                    <Box>Notes Drawer</Box>
                                <Button size="xs" width="50" colorScheme="cyan" onClick={props.newNote}><SmallAddIcon /></Button>

                                </HStack>
                            </DrawerHeader>
                        <DrawerBody>
                            {noteElements}
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
                <Spacer />
                <ColorModeSwitcher justifySelf="flex-end" />
            </Flex>
        </>
    )
}