import { useState } from "react"
import {
  createStyles,
  Header,
  Group,
  ActionIcon,
  Container,
  Burger,
  Avatar,
  UnstyledButton,
  Menu,
  Text,
  Drawer,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import LogoutIcon from "@mui/icons-material/Logout"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"
import {
  IconSearch,
  IconCirclePlus,
  IconClipboardText,
  IconLayoutSidebarRight,
} from "@tabler/icons-react"
import { IconButton } from "@mui/material"
import SearchModal from "../components/SearchModal"
import TopBar from '../components/TopBar'


const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  modal: {
    display: "flex",
    flexDirection: "column",
    marginTop: "100px",
  },

  modalLinks: {
    width: "100%",

    div: {
      height: "100px",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      width: "auto",
      marginLeft: "auto",
    },
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}))

interface HeaderMiddleProps {
  user:
    | false
    | {
        uid: string
        email: string
        displayName: string
        photoURL: string
        admin: boolean
      }
    | null
  links: { link: string; label: string }[]
}

export default function HeaderMiddle({ user, links }: HeaderMiddleProps) {
  const [opened, { toggle }] = useDisclosure(false)
  const { classes, cx } = useStyles()
  const [userMenuOpened, setUserMenuOpened] = useState(false)
  const navigate = useNavigate()
  const [searchModalOpened, searchModal] = useDisclosure(false)

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={({ isActive }) =>
        cx(classes.link, {
          [classes.linkActive]: isActive,
        })
      }
    >
      {link.label}
    </NavLink>
  ))

  return (
    <>
      <TopBar />
      <Header
        height={56}
        sx={{
          position: "sticky",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.80)",
          backdropFilter: "blur(10px)",
          zIndex: 1,
        }}
      >
        <Drawer
          style={{ width: "100%" }}
          opened={opened}
          onClose={toggle}
          padding="xl"
          withCloseButton={false}
        >
          <Group className={classes.modal} spacing={5}>
            {items}
            <IconButton onClick={searchModal.toggle}>
              <IconSearch />
            </IconButton>
          </Group>
        </Drawer>

        <Container className={classes.inner}>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            className={classes.burger}
          />

          <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            zIndex={100000000000}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group spacing={7}>
                  <Avatar
                    src={user ? user.photoURL : ""}
                    alt={user ? user.email : ""}
                    radius="xl"
                    size={20}
                  />
                  <Text
                    weight={500}
                    size="sm"
                    mr={3}
                    sx={{
                      maxWidth: "100px",
                      overflow: "hidden",
                    }}
                  >
                    {user ? user.email : "Kullanıcı"}
                  </Text>
                  <ExpandMoreIcon />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              {!user && (
                <>
                  <Menu.Label>Kullanıcı</Menu.Label>
                  <Link to="/login">
                    <Menu.Item icon={<LogoutIcon />}>Giriş Yap</Menu.Item>
                  </Link>
                </>
              )}

              {user && (
                <>
                  <Menu.Label>Kullanıcı</Menu.Label>
                  <div
                    onClick={() => {
                      signOut(auth)
                        .then(() => {
                          // Sign-out successful.
                          navigate("/login")
                        })
                        .catch((error) => {
                          // An error happened.
                          console.log(error)
                        })
                    }}
                  >
                    <Menu.Item icon={<LogoutIcon />}>Çıkış Yap</Menu.Item>
                  </div>
                </>
              )}

              {user && user.admin && (
                <>
                  <Menu.Divider />
                  <Menu.Label>Admin</Menu.Label>

                  <Link to="/add-post">
                    <Menu.Item icon={<IconCirclePlus />}>Yeni Yazı</Menu.Item>
                  </Link>
                  <Link to="/admin-posts">
                    <Menu.Item icon={<IconClipboardText />}>Yazılar</Menu.Item>
                  </Link>
                  <Link to="/update-right">
                    <Menu.Item icon={<IconLayoutSidebarRight />}>
                      Sağ Menü
                    </Menu.Item>
                  </Link>
                </>
              )}
            </Menu.Dropdown>
          </Menu>

          <Group className={classes.links} spacing={5}>
            {items}
            <IconButton onClick={searchModal.toggle}>
              <IconSearch />
            </IconButton>
          </Group>

          <Group spacing={0} className={classes.social} position="right" noWrap>
            <Link to="https://twitter.com/sprinkai0" target="_blank">
              <ActionIcon size="lg">
                <TwitterIcon />
              </ActionIcon>
            </Link>
            <Link to="https://www.instagram.com/sprinkai/" target="_blank">
              <ActionIcon size="lg">
                <InstagramIcon />
              </ActionIcon>
            </Link>
          </Group>
        </Container>

        <SearchModal opened={searchModalOpened} toggle={searchModal.toggle} />
      </Header>
    </>
  )
}
