import {Button, SortPayload, useListContext, useTranslate, useTranslateLabel} from "react-admin";

import {useCallback, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import Box from "@mui/material/Box";
import {Tooltip, useMediaQuery} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SwapVertIcon from "@mui/icons-material/SwapVert";

interface SortButtonProps {
    fields: string[];
    icon?: React.ReactNode;
}

/**
 * Button to sort list of items, available for List screen.
 * For each specified field two sort directions (ascending, descending) are generated.
 *
 * @param fields fields to sort by
 * @param icon button icon
 * @constructor
 */
export const SortButton = ({fields, icon}: SortButtonProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const isXsSmall = useMediaQuery((theme: any) => {
        return theme.breakpoints.down("sm");
    });

    const {setSort, resource, sort} = useListContext();
    const translateLabel = useTranslateLabel();
    const translate = useTranslate();

    const handleSortButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleSortOptionClick = (sortPayload: SortPayload) => {
        setAnchorEl(null);
        setSort(sortPayload);
    };

    const handleSortMenuClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const sortOptions: SortPayload[] = [];
    fields.forEach((field) => {
        sortOptions.push({
            field: field,
            order: "ASC"
        });
        sortOptions.push({
            field: field,
            order: "DESC"
        });
    });

    if (sortOptions.length === 0) {
        return <div/>;
    }
    return (
        <>
            <div>
                {isXsSmall ? <Tooltip title={translate("common.sortBy")}>
                        <IconButton size="large" aria-label={translate("common.sortBy")} color="primary"
                                    onClick={handleSortButtonClick}>
                            {icon ? icon : <SwapVertIcon/>}
                        </IconButton>
                    </Tooltip>
                    : <Button onClick={handleSortButtonClick} label="common.sortBy"
                              startIcon={icon ? icon : <SwapVertIcon/>}/>}
                <Menu anchorEl={anchorEl}
                      open={open}
                      onClose={handleSortMenuClose}>
                    {sortOptions.map((sortPayload: SortPayload, index: number) => {
                        return <MenuItem
                            key={`${sortPayload.field}${sortPayload.order}${index}`}
                            selected={sort ? sort.field === sortPayload.field && sort.order === sortPayload.order : false}
                            onClick={() => handleSortOptionClick(sortPayload)}>
                            <Box display="flex" alignItems="center">
                                {sortPayload.order === "ASC" ?
                                    <NorthIcon fontSize="inherit" sx={{color: "grey.500", paddingRight: "0.5em"}}/> :
                                    <SouthIcon fontSize="inherit" sx={{color: "grey.500", paddingRight: "0.5em"}}/>}
                                <Typography sx={{color: "text.primary"}}>
                                    {translateLabel({resource: resource, source: sortPayload.field})}
                                </Typography>
                            </Box>
                        </MenuItem>;
                    })}
                </Menu>
            </div>
        </>
    );
};