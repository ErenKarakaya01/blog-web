import { Group, Grid, Col, Paper } from "@mantine/core"
import formStyles from "../sass/form.module.scss"
import "../assets/images/1.jpg"

const FormPageBackground = () => {
  return (
    <Grid className={formStyles.background}>
      <Col span={4}>
        <Group>
          <Paper
            shadow="0.5em 0.5em 0.5em rgba(101, 101, 101, 0.685)"
            className={formStyles.paper}
          >
            <img
              src={require("../assets/images/5.jpg")}
              alt="beyaz5"
              className={formStyles.image}
            />
          </Paper>
          <Paper
            shadow="0.5em 0.5em 0.5em rgba(101, 101, 101, 0.685)"
            className={formStyles.paper}
          >
            <img
              src={require("../assets/images/2.jpg")}
              alt="beyaz2"
              className={formStyles.image}
            />
          </Paper>
        </Group>
      </Col>
      <Col span={4}>
        <Group>
          <Paper
            shadow="0.5em 0.5em 0.5em rgba(101, 101, 101, 0.685)"
            className={formStyles.paper}
          >
            <img
              src={require("../assets/images/3.jpg")}
              alt="beyaz3"
              className={formStyles.image}
            />
          </Paper>
          <Paper
            shadow="0.5em 0.5em 0.5em rgba(101, 101, 101, 0.685)"
            className={formStyles.paper}
          >
            <img
              src={require("../assets/images/4.jpg")}
              alt="beyaz4"
              className={formStyles.image}
            />
          </Paper>
        </Group>
      </Col>
      <Col span={4}>
        <Group>
          <Paper
            shadow="0.5em 0.5em 0.5em rgba(101, 101, 101, 0.685)"
            className={formStyles.paper}
          >
            <img
              src={require("../assets/images/1.jpg")}
              alt="beyaz1"
              className={formStyles.image}
            />
          </Paper>
          <Paper
            shadow="0.5em 0.5em 0.5em rgba(101, 101, 101, 0.685)"
            className={formStyles.paper}
          >
            <img
              src={require("../assets/images/6.jpg")}
              alt="beyaz6"
              className={formStyles.image}
            />
          </Paper>
        </Group>
      </Col>
    </Grid>
  )
}

export default FormPageBackground
