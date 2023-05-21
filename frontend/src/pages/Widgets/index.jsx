import { EditOutlined, LocationOnOutlined, ManageAccountsOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Widgets = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const res = await fetch(`http://localhost:3001/user/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends = []
    } = user;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween>
                <UserImage image={picturePath} />
                <Box>
                    <Typography
                        variant="h4"
                        color={dark}
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                        }}
                    >
                        {firstName} {lastName}
                    </Typography>
                    <Typography color={medium} >{friends.length} friends</Typography>
                </Box>
                <ManageAccountsOutlined />
            </FlexBetween>
            <Divider />

            {/* SECOND ROW */}
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    <Typography>{occupation}</Typography>
                </Box>
            </Box>
            <Divider />

            {/* THRID ROW */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium} >Who's viewed your pofile</Typography>
                    <Typography color={main} fontWeight="500" >{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween>
                    <Typography color={medium} >Impressions of your post</Typography>
                    <Typography color={main} fontWeight="500">{impressions}</Typography>
                </FlexBetween>
            </Box>
            <Divider />

            {/* FORTH ROW */}
            <Box>
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem" >Social Profiles</Typography>
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            <Typography color={main} fontWeight="500">Twitter</Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            <Typography color={main} fontWeight="500">Linkedin</Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    )
}

export default Widgets;