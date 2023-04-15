import { Button, Group, PasswordInput, TextInput } from "@mantine/core"
import { useForm, UseFormReturnType } from "@mantine/form"
import formStyles from "../sass/form.module.scss"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"
import { setUser } from "../redux/user/userSlice"
import isAdmin from "../utils/isAdmin"
import { showError } from "../core/utils/notifications"

interface FormValues {
  email: string
  password: string
  confirmPassword: string
}

const RegisterForm = () => {
  const navigate = useNavigate()

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
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email ? userCredential.user.email : "",
          displayName: userCredential.user.displayName
            ? userCredential.user.displayName
            : "",
          // generate a random avatar
          photoURL: `https://ui-avatars.com/api/?name=${
            userCredential.user.email ? userCredential.user.email : ""
          }&background=0D8ABC&color=fff`,
          admin: isAdmin(userCredential.user.uid) ? true : false,
        })
        navigate("/")
      })
      .catch((error) => {
        showError("Kayıt başarısız oldu. Lütfen bilgilerinizi kontrol edin.")
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
        <a href="/login">Giriş Yap</a>
        <Button type="submit">Kayıt Ol</Button>
      </Group>
    </form>
  )
}

export default RegisterForm
