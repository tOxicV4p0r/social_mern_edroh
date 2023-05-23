import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "store";
import Friend from "components/Friend";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { FormattedDate, FormattedRelativeTime, IntlProvider } from "react-intl";
import { patchLike, service } from "services/api";
import { useTheme } from "@emotion/react";
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    createdAt
}) => {
    const dispatch = useDispatch();
    const [isComments, setIsComments] = useState(false);
    const token = useSelector((state) => state.token);
    const currentUserId = useSelector((state) => state.user._id);
    
    const isLiked = Boolean(likes[currentUserId])
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const primary = palette.primary.main;
    const main = palette.neutral.main;
    const lightMedium = palette.neutral.lightMedium;


    const handleLike = async () => {
        const updatedPostRes = await patchLike({ token, currentUserId, postId });
        dispatch(setPost({ post: updatedPostRes }));
    }

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{ mt: "1rem" }} >{description}</Typography>
            <Typography color={main} sx={{ mt: "0.5rem", fontSize: "0.9rem", color: lightMedium }}>
                <IntlProvider defaultLocale="en" locale="en">
                    {((Date.now() / 1000) - (new Date(createdAt) / 1000)) > 86400 ?
                        <FormattedDate
                            value={new Date(createdAt)}
                            month="long"
                            year="numeric"
                            day="2-digit"
                        />
                        :
                        <FormattedRelativeTime
                            value={(new Date(createdAt) / 1000) - Date.now() / 1000}
                            style="narrow"
                            updateIntervalInSeconds={1}
                        />
                    }
                </IntlProvider>
            </Typography>
            {
                picturePath ?
                    <img
                        width="100%"
                        height="auto"
                        alt="post"
                        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                        src={`${service.baseURL}/assets/${picturePath}`}
                    /> : null
            }
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={handleLike}>
                            {isLiked ? <FavoriteOutlined sx={{ color: primary }} /> : <FavoriteBorderOutlined />}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>

                </FlexBetween>
                <IconButton>
                    <ShareOutlined sx={{ color: lightMedium }} />
                </IconButton>
            </FlexBetween>
            {
                isComments ?
                    <Box mt="0.5rem">
                        {
                            comments.map((comment, i) => (
                                <Box key={`${name}_${i}`}>
                                    <Divider />
                                    <Typography
                                        sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}
                                    >
                                        {comment}
                                    </Typography>
                                </Box>
                            ))
                        }
                        <Divider />
                    </Box>
                    : null
            }

        </WidgetWrapper>
    )
};

export default PostWidget;