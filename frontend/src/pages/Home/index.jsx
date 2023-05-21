import { Box, useMediaQuery } from "@mui/material";
import Nav from "pages/Nav";
import Widgets from "pages/Widgets";
import { useSelector } from "react-redux";

const Home = () => {
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    return (
        <Box>
            <Nav />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreen ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
                    <Widgets userId={_id} picturePath={picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreen ? "42%" : undefined}
                    mt={isNonMobileScreen ? undefined : "2rem"}
                >
                    Feed
                </Box>
                {
                    isNonMobileScreen ?
                        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
                            friend suggestion
                        </Box>
                        : null
                }
            </Box>
        </Box>
    )
}

export default Home;