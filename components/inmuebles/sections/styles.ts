export const styles = {
    mainContainer: {
        width: "100%",
        minHeight: "500px",
        marginInline: "auto",
        position: "relative",
        display: "flex",
        overflow: "hidden",
        "&:hover > #ver-mas": {
            transform: "translateX(-50%) translateY(-50%) scale(1)",
            boxShadow: "0 0 10px rgba(255,255,255,0.6)"
        },
        "&:hover > #img > span > #imagen": {
            WebKitFilter: "blur(8px) !important",
            filter: "blur(8px) !important",
        }
    },
    input: {
        "& fieldset": {
            border: "none",
            boxShadow: "0 0 5px rgba(0,0,0,0.1)"
        },
        borderRadius: 5,
    },
    gradientBoxSizes: {
        minWidth: "100%",
        minHeight: 400,
        p: 5,
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "center",
        justifyContent: "center",
    },
    contentBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    gradiantBoxShadow: {
        background: "#FFF",
        position: "relative",
        borderRadius: 5,
        "&:hover": {
            boxShadow: "0 0 5px rgba(0,0,0,0.2)"
        }
    },
    imageContainer: {
        display: "block",
        minWidth: 250,
        minHeight: 250,
        mr: 3,
        mb: 2,
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
    },
}