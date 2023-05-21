import { PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.primary.main;
    const medium = palette.primary.medium;

    // const isFriend = friends.find((friend) => friend._id === userId);

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h6"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {
                    //friends.map((friends) => no destructure
                    friends.map(({ _id, firstName, lastName, location, picturePath }) => (
                        <Friend
                            friendId={_id}
                            name={`${firstName} ${lastName}`}
                            subtitle={location}
                            userPicturePath={picturePath}
                        />)
                    )
                }
            </Box>
        </WidgetWrapper>
    )
}

export default FriendListWidget;