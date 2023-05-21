import { useTheme } from "@emotion/react";
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";

const PostWidget = ({
    key,
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments
}) => {

    return (
        <div>{userPicturePath}</div>
    )
};

export default PostWidget;