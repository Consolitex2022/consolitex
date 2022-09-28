import { Paper, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { Dispatch, SetStateAction, FC, MouseEvent } from "react";
import { IOption } from "../../interfaces/toggler-options-type";

interface PropsToggler {
    setStateToggler: Dispatch<SetStateAction<string>>;
    stateToggler: string;
    optionsToggler: IOption[];
}

export const TogglerGroup: FC<PropsToggler> = ({ setStateToggler, stateToggler, optionsToggler }) => {
    const handleChange = (event: MouseEvent<HTMLElement>, newAlignment: string) => {
        setStateToggler(newAlignment);
    };
    return (
        <Paper elevation={0} sx={{ width: "100%", textAlign: "center", border: "1px solid rgba(0,0,0,0.3)", overflow: "hidden", borderRadius: 10 }}>
            <ToggleButtonGroup
                color="primary"
                value={stateToggler}
                exclusive
                onChange={handleChange}
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