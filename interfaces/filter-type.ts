export type IFilter = {
    to: string | number;
    from: string | number;
    tipo: string;
    banos: string;
    query: string;
    negocio: string;
    localidad: string;
    habitaciones: string;
    estacionamientos: string;
    filterAnterior: IFilter | null;
}