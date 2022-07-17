import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import { Box, Flex, HStack, VStack, Text } from "@chakra-ui/react"

const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

export default function Editor({currentNote, updateNote}) {
    const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">("write");

    interface EditorProps {
        currentNote: any
        updateNote: any
    }

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,

    })

    return (
        <Flex>
            <ReactMde
                value={currentNote.body}
                onChange={updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
                }
            />
        </Flex>
    )
}
