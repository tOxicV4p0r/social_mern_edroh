import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const main = palette.primary.main;
    const medium = palette.primary.medium;

    const isMe = friendId === _id;
    const isFriend = friends.find((friend) => friend._id === friendId);

    const patchFriend = async () => {
        const res = await fetch(`http://localhost:3001/user/${_id}/${friendId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        dispatch(setFriends({ friends: data }))
    };

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />

                <Box
                    onClick={() => { navigate(`/profile/${friendId}`) }}
                >
                    <Typography
                        color={main}
                        variant="h6"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        color={medium} fontSize="0.75rem"
                    >
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            {!isMe ?
                <IconButton
                    onClick={() => patchFriend()}
                    sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
                >
                    {isFriend ? <PersonRemoveOutlined /> : <PersonAddOutlined />}
                </IconButton>
                : null
            }
        </FlexBetween >
    )
};

export default Friend;