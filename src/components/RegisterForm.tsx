import {
  Button,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core"
import { useForm, UseFormReturnType } from "@mantine/form"
import formStyles from "../sass/form.module.scss"

interface FormValues {
  email: string
  password: string
  confirmPassword: string
}

const RegisterForm = () => {

  // Handles form input formats
  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: (values: FormValues) => ({
      email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
      password:
        values.password.length <= 8
          ? "Password Needs To Be At Least 8 Characters"
          : null,
      confirmPassword:
        values.password !== values.confirmPassword
          ? "Passwords Did Not Match"
          : null,
    }),
  })

  // Handles post request of register
  const handleSubmit = (values: FormValues) => {
    /* axios
      .post("/users/register", values)
      .then(({ data }) => {
        if (data.isRegistered) {
          showNotification({
            autoClose: 5000,
            title: "Register Success",
            message: "Register was successful",
            color: "green",
          })
          router.push("/login")
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

      <PasswordInput
        mt="sm"
        label="Confirm password"
        placeholder="Confirm password"
        {...form.getInputProps("confirmPassword")}
      />

      <Group position="apart" mt="md">
        <a href="/login">Login</a>
        <Button type="submit">Register</Button>
      </Group>
    </form>
  )
}

export default RegisterForm
