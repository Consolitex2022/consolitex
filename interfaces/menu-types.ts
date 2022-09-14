import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";

export type MenuProps = {
    search: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleChangeSelect: (e: SelectChangeEvent, tipo: string) => void;
    onSubmit: () => void;
    tipo: string;
    negocio: string;
    localidad: string;
}