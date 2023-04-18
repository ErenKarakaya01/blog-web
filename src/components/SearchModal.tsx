import { Button, Modal, TextInput, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mui/material"
import { IconSearch } from "@tabler/icons-react"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import SearchIcon from "@mui/icons-material/Search"

const SearchModal = ({
  opened,
  toggle,
}: {
  opened: boolean
  toggle: () => void
}) => {
  const isMobile = useMediaQuery("(max-width: 50em)")
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    toggle()

    navigate(`/?title=${search}`)
  }

  return (
    <Modal
      opened={opened}
      onClose={toggle}
      fullScreen={isMobile}
      sx={{
        transition: "fade",
        duration: 200,
        marginTop: "200px",
        maxHeight: "300px",
      }}
      overlayBlur={isMobile ? 0 : 3}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      centered
    >
      <form onSubmit={handleSubmit}>
        <TextInput
          placeholder="Ara"
          icon={<IconSearch size="0.8rem" />}
          size="lg"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </form>
    </Modal>
  )
}

export default SearchModal
