import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { EditOutlined, LocationOnOutlined, ManageAccountsOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import { Box, Divider, Typography, useTheme } from "@mui/material";

const UserWidget = ({ userId, picturePath }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const profile = useSelector((state) => state.profile);

    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const lightMedium = palette.neutral.lightMedium;
    const light = palette.primary.light;
    const main = palette.neutral.main;

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends = []
    } = user._id === profile._id ? user : profile;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h6"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: light,
                                    cursor: "pointer"
                                }
                            }}
                            onClick={() => {
                                navigate(`/profile/${userId}`)
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium} >{friends.length} friends</Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined sx={{ color: lightMedium }} />
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
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem" >Social Profiles</Typography>
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            <Typography color={main} fontWeight="500">Twitter</Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: lightMedium }} />
                </FlexBetween>

                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            <Typography color={main} fontWeight="500">Linkedin</Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: lightMedium }} />
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    )
}

export default UserWidget;