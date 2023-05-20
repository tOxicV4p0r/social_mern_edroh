import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import FormLoginTest from "./FormLoginTest";
import FormLogin from "./FormLogin";

const Login = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    return (
        <Box>
            <Box
                width="100%"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color="primary"
                >
                    SocialPedia
                </Typography>
            </Box>

            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography>
                    Welcome to SocialPedia, the social media for Socialism
                </Typography>
                <FormLogin />
            </Box>
        </Box>
    )
}

export default Login;