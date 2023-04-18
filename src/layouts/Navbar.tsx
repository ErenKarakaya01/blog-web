import { useEffect, useState } from "react"
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
import FavoriteIcon from "@mui/icons-material/Favorite"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import LogoutIcon from "@mui/icons-material/Logout"
import MessageIcon from "@mui/icons-material/Message"
import SettingsIcon from "@mui/icons-material/Settings"
import StarIcon from "@mui/icons-material/Star"
import DeleteIcon from "@mui/icons-material/Delete"
import { NavLink, useNavigate } from "react-router-dom"
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
import homeStyles from "../sass/home.module.scss"

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
  scrollPosition: {
    x: number
    y: number
  }
}

export default function HeaderMiddle({
  user,
  links,
  scrollPosition,
}: HeaderMiddleProps) {
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
      <div
        className={homeStyles.topbar}
        style={{
          display: scrollPosition.y > 56 ? "none" : "flex",
        }}
      >
        ESEN BLOG
      </div>

      <Header
        height={56}
        sx={{
          position: "sticky",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.80)",
          backdropFilter: "blur(10px)",
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
                  <Menu.Item icon={<LogoutIcon />}>
                    <div onClick={() => navigate("/login")}>Giriş Yap</div>
                  </Menu.Item>
                </>
              )}

              {user && (
                <>
                  <Menu.Label>Kullanıcı</Menu.Label>
                  <Menu.Item icon={<LogoutIcon />}>
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
                      Çıkış Yap
                    </div>
                  </Menu.Item>
                </>
              )}

              {user && user.admin && (
                <>
                  <Menu.Divider />
                  <Menu.Label>Admin</Menu.Label>

                  <Menu.Item icon={<IconCirclePlus />}>
                    <div onClick={() => navigate("/add-post")}>Yazı Ekle</div>
                  </Menu.Item>
                  <Menu.Item icon={<IconClipboardText />}>
                    <div onClick={() => navigate("/admin-posts")}>Yazılar</div>
                  </Menu.Item>
                  <Menu.Item icon={<IconLayoutSidebarRight />}>
                    <div onClick={() => navigate("/update-right")}>
                      Sağ Menü
                    </div>
                  </Menu.Item>
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
            <ActionIcon size="lg">
              <TwitterIcon />
            </ActionIcon>
            <ActionIcon size="lg">
              <InstagramIcon />
            </ActionIcon>
          </Group>
        </Container>

        <SearchModal opened={searchModalOpened} toggle={searchModal.toggle} />
      </Header>
    </>
  )
}
