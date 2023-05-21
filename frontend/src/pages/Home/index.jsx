import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Nav from "pages/Nav";
import UserWidget from "pages/Widgets/UserWidget";
import MypostWidget from "pages/Widgets/MypostWidget";
import PostsWidget from "pages/Widgets/PostsWidget";
import AdWidget from "pages/Widgets/AdWidget";
import FriendListWidget from "pages/Widgets/FriendListWidget";

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
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreen ? "42%" : undefined}
                    mt={isNonMobileScreen ? undefined : "2rem"}
                >
                    <MypostWidget />
                    <PostsWidget userId={_id} isProfile={false} />
                </Box>
                {
                    isNonMobileScreen ?
                        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
                            <AdWidget />
                            <Box m="2rem 0">
                                <FriendListWidget userId={_id} />
                            </Box>
                        </Box>
                        : null
                }
            </Box>
        </Box>
    )
}

export default Home;