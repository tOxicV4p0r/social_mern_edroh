import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import {
    Alert,
    Box,
    Button,
    Snackbar,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required")
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
}

const initialValuesLogin = {
    email: "",
    password: "",
}

const FormLogin = () => {
    const [pageType, setPageType] = useState("login");
    const [openAlert, setOpenAlert] = useState();
    const [msgAlert, setMsgAlert] = useState("");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const login = async (values, event) => {
        const loggedInResponse = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            }
        );
        const loggedIn = await loggedInResponse.json();
        if (loggedIn) {
            const { user, token } = loggedIn;
            if (token) {
                event.resetForm();
                dispatch(
                    setLogin({ user, token })
                );

                navigate("/home");
            } else {
                const { msg } = loggedIn;
                setMsgAlert(msg);
                setOpenAlert(true);
            }
        }
    }

    const register = async (values, event) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }

        formData.append('picturePath', values.picture.name);

        const savedUserResponse = await fetch("http://localhost:3001/auth/register", { method: "POST", body: formData });
        const savedUser = await savedUserResponse.json();
        event.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    }

    const handleClose = () => {
        setOpenAlert(false);
    }

    const handleFormSubmit = async (values, event) => {
        if (isLogin) return await login(values, event);

        if (isRegister) return await register(values, event);
    }

    return (
        <>
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="error">{msgAlert}</Alert>
            </Snackbar>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
                validationSchema={isLogin ? loginSchema : registerSchema}
            >
                {
                    ({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        resetForm
                    }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                                    }}
                                >
                                    {
                                        isRegister ? (
                                            <>
                                                <TextField
                                                    label="First Name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.firstName}
                                                    name="firstName"
                                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                                    helperText={touched.firstName && errors.firstName}
                                                    sx={{ gridColumn: "span 2" }}
                                                />
                                                <TextField
                                                    label="Last Name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.lastName}
                                                    name="lastName"
                                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                                    helperText={touched.lastName && errors.lastName}
                                                    sx={{ gridColumn: "span 2" }}
                                                />
                                                <TextField
                                                    label="Location"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.location}
                                                    name="location"
                                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                                    helperText={touched.location && errors.location}
                                                    sx={{ gridColumn: "span 4" }}
                                                />
                                                <TextField
                                                    label="Occupation"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.occupation}
                                                    name="occupation"
                                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                                    helperText={touched.occupation && errors.occupation}
                                                    sx={{ gridColumn: "span 4" }}
                                                />
                                                <Box
                                                    gridColumn="span 4"
                                                    border={`1px solid ${palette.neutral.medium}`}
                                                    borderRadius="5px"
                                                    p="1rem"
                                                >
                                                    <Dropzone
                                                        acceptedFiles=".jpg,.jpeg,.png"
                                                        multiple={false}
                                                        onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
                                                    >
                                                        {({ getRootProps, getInputProps }) =>
                                                            <Box
                                                                {...getRootProps()}
                                                                border={`2px dashed ${palette.primary.main}`}
                                                                p="1rem"
                                                                sx={{ "&:hover": { cursor: "pointer" } }}
                                                            >
                                                                <input {...getInputProps()} />
                                                                {
                                                                    !values.picture ?
                                                                        (
                                                                            <p>Add Picture Here</p>
                                                                        ) : (
                                                                            <FlexBetween>
                                                                                <Typography>{values.picture.name}</Typography>
                                                                                <EditOutlinedIcon />
                                                                            </FlexBetween>
                                                                        )
                                                                }
                                                            </Box>
                                                        }
                                                    </Dropzone>
                                                </Box>
                                            </>
                                        ) : null
                                    }
                                    <TextField
                                        label="Email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        name="email"
                                        error={Boolean(touched.email) && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        label="Password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        name="password"
                                        error={Boolean(touched.password) && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <Box
                                        gridColumn="span 4"
                                    >
                                        <FlexBetween gap="0.2rem">
                                            <Button
                                                fullWidth
                                                type="submit"
                                                sx={{
                                                    m: "2rem 0",
                                                    p: "1rem",
                                                    backgroundColor: palette.primary.main,
                                                    color: palette.background.alt,
                                                    "&:hover": { color: palette.primary.main }
                                                }}
                                            >
                                                {isLogin ? "LOGIN" : "REGISTER"}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outlined"
                                                sx={{
                                                    m: "2rem 0",
                                                    p: "1rem",
                                                }}
                                                onClick={() => { login({ email: "guest@gmail.com", password: "1234" }, { resetForm }) }}
                                            >
                                                GUEST
                                            </Button>
                                        </FlexBetween>
                                        <Typography
                                            onClick={() => {
                                                setPageType(isLogin ? "register" : "login");
                                                resetForm();
                                            }}
                                            sx={{
                                                textDecoration: "underline",
                                                color: palette.primary.main,
                                                "&:hover": {
                                                    cursor: "pointer",
                                                    color: palette.primary.light
                                                }
                                            }}
                                        >
                                            {isLogin ? "Don't have an account? Sign up here." : "Already have an account? Login here"}
                                        </Typography>
                                    </Box>
                                </Box>
                            </form>
                        )
                    }
                }
            </Formik>
        </>
    )
}

export default FormLogin;