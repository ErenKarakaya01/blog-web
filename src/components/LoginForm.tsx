import { Button, Group, PasswordInput, TextInput } from "@mantine/core"
import { useForm, UseFormReturnType } from "@mantine/form"
import formStyles from "../sass/form.module.scss"
import { showNotification } from "@mantine/notifications"

interface FormValues {
  email: string
  password: string
}

const LoginForm = () => {

  // Validate text input formats
  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values: FormValues) => ({
      email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
    }),
  })

  // Handles post request of login
  const handleSubmit = (values: FormValues) => {
    /* axios
      .post("/users/login", values)
      .then(async ({ data }) => {
        if (data.isLoggedIn) {
          setIsAuth!(true)
          const { data } = await axios.get("/users/getuser")

          setUser!(data.user)

          if (data.user.type === "customer") {
            router.push("/browse")
          } else router.push("/gallery")
        } else {
          data.errors.forEach((v: string) =>
            showNotification({
              autoClose: 5000,
              title: "Error",
              message: v,
              color: "red",
            })
          )
        }
      })
      .catch((e: Error) => console.log(e)) */
  }

  return (
    <form
      className={formStyles.form}
      onSubmit={form.onSubmit((values) => handleSubmit(values))}
    >
      <TextInput
        label="Email"
        placeholder="Email"
        {...form.getInputProps("email")}
      />

      <PasswordInput
        label="Password"
        placeholder="Password"
        {...form.getInputProps("password")}
      />

      <Group position="apart" mt="md">
        <a href="/register">Register</a>
        <Button type="submit">Login</Button>
      </Group>
    </form>
  )
}

export default LoginForm
