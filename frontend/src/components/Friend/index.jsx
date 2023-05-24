import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "store";
import { patchFriend } from "services/api";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const [isLoading, setLoading] = useState(false);

    const { palette } = useTheme();
    const main = palette.primary.main;
    const light = palette.primary.light;

    const isMe = friendId === _id;
    const isFriend = friends.find((friend) => friend._id === friendId);

    const handleFriend = async () => {
        setLoading(true);
        const friendsRes = await patchFriend({ token, userId: _id, friendId });
        dispatch(setFriends({ friends: friendsRes }))
        setLoading(false);
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
                                color: light,
                                cursor: "pointer"
                            }
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        color={light} fontSize="0.75rem"
                    >
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            {!isMe ?
                <LoadingButton
                    onClick={handleFriend}
                    sx={{ p: "0.6rem", borderRadius: "9999rem" }}
                    loading={isLoading}
                >
                    {isFriend ? <PersonRemoveOutlined /> : <PersonAddOutlined />}
                </LoadingButton>
                : null
            }
        </FlexBetween >
    )
};

export default Friend;