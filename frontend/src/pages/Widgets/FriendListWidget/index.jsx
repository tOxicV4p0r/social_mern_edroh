import { useSelector } from "react-redux";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { Box, Typography, useTheme } from "@mui/material";

const FriendListWidget = () => {
    const friends = useSelector((state) => state.user.friends);
    
    const { palette } = useTheme();
    const dark = palette.neutral.dark;

    return (
        <WidgetWrapper>
            <Typography
                color={dark}
                variant="h6"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {
                    friends.map(({ _id, firstName, lastName, location, picturePath }) => (
                        <Friend
                            key={_id}
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