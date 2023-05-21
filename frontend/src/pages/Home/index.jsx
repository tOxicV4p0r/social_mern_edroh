import { Box, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Nav from "pages/Nav";
import UserWidget from "pages/Widgets/UserWidget";
import MypostWidget from "pages/Widgets/MypostWidget";
import PostsWidget from "pages/Widgets/PostsWidget";
import Friend from "components/Friend";
import { setFriends } from "state";
import { useEffect } from "react";

const Home = () => {
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath, friends } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();

    const getFriends = async () => {
        const res = await fetch(`http://localhost:3001/user/${_id}/getusers`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);
        dispatch(setFriends({ friends: data }));
    };

    useEffect(() => {
        console.log(token);
        if (token)
            getFriends();
    }, []);

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
                            friend suggestion
                            {
                                friends.map(({ _id, firstName, lastName, occupation, picturePath }) =>
                                    <Friend friendId={_id} name={firstName} subtitle={occupation} userPicturePath={picturePath} />
                                )
                            }
                        </Box>
                        : null
                }
            </Box>
        </Box>
    )
}

export default Home;