import { Button, Group, PasswordInput, TextInput } from "@mantine/core"
import { useForm, UseFormReturnType } from "@mantine/form"
import formStyles from "../sass/form.module.scss"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase'

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
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
      })
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
