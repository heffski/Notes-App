import * as React from "react"
import { nanoid } from 'nanoid'

import {
  ChakraProvider,
  Box,
  Flex,
  VStack,
  Text,
  Heading,
  Code,
  Divider,
  theme,
  Button,
} from "@chakra-ui/react"
import Sidebar from "./Components/Sidebar"
import Editor from "./Components/Editor"


export default function App() {
  const [notes, setNotes]  = React.useState(
    () => JSON.parse(localStorage.getItem("notes")!) || []
    )
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  )

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your note here."
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(text) {
    // put the recently modified note at the top
    setNotes((oldNotes: any) => {
      const newArray: string[] = []
      for(let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i]
        if(oldNote.id === currentNoteId) {
          newArray.unshift({...oldNote, body: text })
        } else {
          newArray.push(oldNote)
        }
      }
      return newArray
    })
  }

  function deleteNote(event, noteId) {
    event?.stopPropagation()
    setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
  }

  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  return (
    <Flex justifyContent="center">
        <ChakraProvider theme={theme}>
        <VStack  maxWidth="450" p='2'>
          <Sidebar 
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            deleteNote={deleteNote}
            newNote={createNewNote}
          />
          
          <Divider />
          {
            currentNoteId &&
            notes.length > 0 &&
            <Editor 
              currentNote={findCurrentNote()}
              updateNote={updateNote}
            />

          }
          <Box>
            {notes.length <= 0 
            ? 
            <Box>
              <Heading>You have no notes.</Heading>
              <Button onClick={createNewNote}>
                Create one Now!
              </Button>
            </Box>
            :
            ""
            }
          </Box>
        </VStack>
      </ChakraProvider>
    </Flex>
  )
}

