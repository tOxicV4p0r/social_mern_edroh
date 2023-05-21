import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.primary.main;
    const medium = palette.primary.medium;

    const isFriend = friends.find((friend) => friend._id === friendId);

    const patchFriend = async () => {
        const res = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data)
        dispatch(setFriends({ friends: data }))
    };

    return (
        <FlexBetween>
            <FlexBetween>
                <UserImage image={userPicturePath} size="55px" />
                <Box>
                    <Typography>{name}</Typography>
                    <Typography>{subtitle}</Typography>
                    <Typography>{userPicturePath}</Typography>
                </Box>
            </FlexBetween>
        </FlexBetween>
    )
};

export default Friend;