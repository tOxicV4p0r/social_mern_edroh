import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setProfile } from "store";
import { fetchUser } from "services/api";
import FriendListWidget from "pages/Widgets/FriendListWidget";
import MypostWidget from "pages/Widgets/MypostWidget";
import PostsWidget from "pages/Widgets/PostsWidget";
import UserWidget from "pages/Widgets/UserWidget";
import { Box, useMediaQuery } from "@mui/material";

const Profile = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

    const getUser = async () => {
        const resUser = await fetchUser({ token, userId });
        setUser(resUser)
        dispatch(setProfile({ profile: resUser }));
    }

    useEffect(() => {
        getUser();
    }, [userId]); // eslint-disable-line

    if (!user) return null;

    return (
        <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreen ? "flex" : "block"}
            gap="2rem"
            justifyContent="center"
        >
            <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
                <UserWidget userId={userId} picturePath={user.picturePath} />
                <Box m="2rem 0">
                    <FriendListWidget userId={userId} />
                </Box>
            </Box>
            <Box
                flexBasis={isNonMobileScreen ? "42%" : undefined}
                mt={isNonMobileScreen ? undefined : "2rem"}
            >
                <Box>
                    <MypostWidget />
                    <PostsWidget userId={userId} isProfile={true} />
                </Box>
            </Box>
        </Box>
    )
}

export default Profile;