import {Button, useListContext} from "react-admin";
import ClearIcon from "@mui/icons-material/Clear";

/**
 * Button clears values for filters selected on List screen.
 * @constructor
 */
export const ClearFilterButton = () => {
    const {displayedFilters, setFilters} = useListContext();
    return (
        <>
            {displayedFilters && Object.keys(displayedFilters).length > 0 &&
                <Button label="common.clearFilter" onClick={() => {
                    setFilters({}, displayedFilters);
                }} startIcon={<ClearIcon/>}/>
            }
        </>
    );
};