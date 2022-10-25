import Paper from "@mui/material/Paper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Dispatch, SetStateAction, FC, MouseEvent } from "react";
import { IOption } from "../../interfaces/toggler-options-type";

interface PropsToggler {
    setStateToggler: Dispatch<SetStateAction<any>>;
    stateToggler: any;
    optionsToggler: IOption[];
    filterName: string;
    fetchData: () => Promise<void>;
}

export const TogglerGroup: FC<PropsToggler> = ({ setStateToggler, stateToggler, optionsToggler, filterName, fetchData }) => {
    const handleChange = async (event: MouseEvent<HTMLElement>, newAlignment: string, filter: string) => {
        setStateToggler({
            ...stateToggler,
            filterAnterior: stateToggler,
            [filter]: newAlignment
        });
    };
    return (
        <Paper elevation={0} sx={{ width: "100%", textAlign: "center", border: "1px solid rgba(0,0,0,0.3)", overflow: "hidden", borderRadius: 10 }}>
            <ToggleButtonGroup
                size="small"
                color="primary"
                value={stateToggler[filterName]}
                exclusive
                onChange={(event, newAlignment) => handleChange(event, newAlignment, filterName)}
                aria-label="Platform"
                sx={{
                    width: "100%",
                    border: "none"
                }}
            >
                {
                    optionsToggler.map(opt => (
                        <ToggleButton key={opt.value} value={opt.value} sx={{ width: "50%", border: "none", color: "text.secondary", fontWeight: "bold", textTransform: "none" }}>{opt.name}</ToggleButton>
                    ))
                }
            </ToggleButtonGroup>
        </Paper >
    )
}