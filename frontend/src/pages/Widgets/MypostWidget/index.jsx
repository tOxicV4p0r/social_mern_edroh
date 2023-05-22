import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import Dropzone from "react-dropzone";
import { Box, Button, Divider, IconButton, InputBase, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AttachFileOutlined, DeleteOutlined, EditOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined } from "@mui/icons-material";

const MypostWidget = () => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id, picturePath } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreen = useMediaQuery("(min-width:1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    const lightMedium = palette.neutral.lightMedium;
    const light = palette.neutral.light;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const res = await fetch('http://localhost:3001/posts', {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        })

        const posts = await res.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setPost("");
    }

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="What's on your mind..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem"
                    }}
                />
            </FlexBetween>
            {
                isImage ?
                    <Box
                        border={`2px solid ${light}`}
                        borderRadius="5px"
                        mt="1rem"
                        p="1rem"
                    >
                        <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                        >
                            {({ getRootProps, getInputProps }) =>
                                <FlexBetween>
                                    <Box
                                        {...getRootProps()}
                                        border={`2px dashed ${palette.primary.main}`}
                                        p="1rem"
                                        width="100%"
                                        sx={{ "&:hover": { cursor: "pointer" } }}
                                    >
                                        <input {...getInputProps()} />
                                        {
                                            !image ?
                                                (
                                                    <p>Add Image Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>{image.name}</Typography>
                                                        <EditOutlined />
                                                    </FlexBetween>
                                                )
                                        }
                                    </Box>
                                    {
                                        image ?
                                            <IconButton
                                                onClick={() => setImage(null)}
                                                sx={{ width: "15%" }}
                                            >
                                                <DeleteOutlined />
                                            </IconButton>
                                            : null
                                    }
                                </FlexBetween>
                            }
                        </Dropzone>
                    </Box>
                    : null
            }

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween>
                <FlexBetween gap="0.25rem" sx={{ color: mediumMain, "&:hover": { cursor: "pointer", color: medium } }} onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined />
                    <Typography>Image</Typography>
                </FlexBetween>
                {
                    isNonMobileScreen ?
                        <>
                            <FlexBetween gap="0.25rem" sx={{ color: lightMedium }}>
                                <GifBoxOutlined />
                                <Typography>Clip</Typography>
                            </FlexBetween>

                            <FlexBetween gap="0.25rem" sx={{ color: lightMedium }}>
                                <AttachFileOutlined />
                                <Typography>Attachment</Typography>
                            </FlexBetween>

                            <FlexBetween gap="0.25rem" sx={{ color: lightMedium }}>
                                <MicOutlined />
                                <Typography>Audio</Typography>
                            </FlexBetween>
                        </>
                        :
                        <FlexBetween>
                            <MoreHorizOutlined />
                        </FlexBetween>
                }

                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    )
};

export default MypostWidget;