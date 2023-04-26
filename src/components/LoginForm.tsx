import { Button, Center, Group, PasswordInput, TextInput } from "@mantine/core"
import { useForm, UseFormReturnType } from "@mantine/form"
import formStyles from "../sass/form.module.scss"
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"
import { auth, provider } from "../firebase/firebase"
import { setUser } from "../redux/user/userSlice"
import { useNavigate } from "react-router-dom"
import isAdmin from "../utils/isAdmin"
import { showError } from "../core/utils/notifications"
import { useAppDispatch } from "../redux/hooks"

interface FormValues {
  email: string
  password: string
}

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // Validate text input formats
  const form: UseFormReturnType<FormValues> = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values: FormValues) => ({
      email: /^\S+@\S+$/.test(values.email) ? null : "Email formatı hatalı",
    }),
  })

  // Handles post request of login
  const handleSubmit = (values: FormValues) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        dispatch(
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
        )
        navigate("/")
      })
      .catch((error) => {
        showError("Giriş başarısız oldu. Lütfen bilgilerinizi kontrol edin.")
      })
  }

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email ? user.email : "",
            displayName: user.displayName ? user.displayName : "",
            photoURL: user.photoURL ? user.photoURL : "",
            admin: isAdmin(user.uid) ? true : false,
          })
        )
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
        label="Şifre"
        placeholder="Şifre"
        {...form.getInputProps("password")}
      />

      <Group position="apart" mt="md">
        <a href="/register">Kayıt Ol</a>
        <Button type="submit">Giriş Yap</Button>
      </Group>

      <Center mt={20}>
        <img
          src={require("../assets/images/btn_google_signin_light_normal_web.png")}
          alt="Login"
          className={formStyles.google}
          onClick={handleGoogleLogin}
        />
      </Center>
    </form>
  )
}

export default LoginForm
