import { Button, Group, PasswordInput, TextInput } from "@mantine/core"
import { useForm, UseFormReturnType } from "@mantine/form"
import formStyles from "../sass/form.module.scss"
import { showNotification } from "@mantine/notifications"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../firebase/firebase'

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
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {})
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
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
