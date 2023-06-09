import Typography from "@mui/material/Typography";
import {useTranslate} from "react-admin";

interface NoItemsProps {
    text: string
}

export const NoItems = ({text}: NoItemsProps) => {
    const translate = useTranslate();

    return (
        <>
            <Typography paddingTop="5em" paddingBottom="5em" variant="h6"
                        color="text.secondary" textAlign="center">
                {translate(text)}
            </Typography>
        </>
    );
};
