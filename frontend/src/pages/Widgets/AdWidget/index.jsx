import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>

            <FlexBetween>
                <Typography color={dark} variant="h6" fontWeight="500">Sponsored</Typography>
                <Typography color={medium} >Create Ad</Typography>
            </FlexBetween>

            <img
                width="100%"
                height="auto"
                alt="advert"
                src="http://localhost:3001/assets/ad.jpg"
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            />

            <FlexBetween>
                <Typography color={main} >Visit me</Typography>
                <Typography color={medium} >Blackboy96.xzy</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                Anyone who stops lerning is old, whether at twenty or eighty.
                Anyone who keeps lerning stays young.
                The greatest thing in life is to keep your mind young.
            </Typography>

        </WidgetWrapper>
    )
}

export default AdWidget;