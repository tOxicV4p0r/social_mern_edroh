import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { service } from "services/api"
import { Link, Typography, useTheme } from "@mui/material";

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
                src={`${service.baseURL}/assets/ad.jpg`}
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            />

            <FlexBetween>
                <Typography color={main} >Visit me</Typography>
                <Typography color={dark} ><Link href="https://blackboy96.xyz" underline="hover" rel="noreferrer" target="_blank">Blackboy96.xyz</Link></Typography>
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