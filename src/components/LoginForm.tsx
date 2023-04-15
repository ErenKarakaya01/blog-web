import { Button, Group, PasswordInput, TextInput } from "@mantine/core"
import { useForm, UseFormReturnType } from "@mantine/form"
import formStyles from "../sass/form.module.scss"
import { showNotification } from "@mantine/notifications"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { setUser } from "../redux/user/userSlice"
import { useNavigate } from "react-router-dom"
import isAdmin from "../utils/isAdmin"
import { showError } from "../core/utils/notifications"

interface FormValues {
  email: string
  password: string
}

const LoginForm = () => {
  const navigate = useNavigate()
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
      .then((userCredential) => {
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email ? userCredential.user.email : "",
          displayName: userCredential.user.displayName
            ? userCredential.user.displayName
            : "",
          photoURL: userCredential.user.photoURL
            ? userCredential.user.photoURL
            : "",
          admin: isAdmin(userCredential.user.uid) ? true : false,
        })
        navigate("/")
      })
      .catch((error) => {
        showError("Giriş başarısız oldu. Lütfen bilgilerinizi kontrol edin.")
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
        <a href="/register">Kayıt Ol</a>
        <Button type="submit">Giriş Yap</Button>
      </Group>
    </form>
  )
}

export default LoginForm
