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
            boxShadow: "0 8px 32px 0 rgba(100,100,100,0.2)"
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
            "&:before": {
                content: "''",
                zIndex: -1,
                position: "absolute",
                top: "0",
                right: "0",
                bottom: "0",
                left: "0",
                background: "linear-gradient(327deg, rgba(100,100,100,0.1) 0%, rgba(150,150,150,0.1) 73%, rgba(50,50,50,0.1) 100%)",
                transform: "translate3d(0px, 20px, 0) scale(0.95)",
                filter: "blur(34px)",
                opacity: "var(0.47)",
                transition: "opacity 0.3s",
                borderRadius: "inherit",
            },

            /* 
            * Prevents issues when the parent creates a 
            * stacking context. (For example, using the transform
            * property )
            */
            "&:after": {
                content: "''",
                zIndex: -1,
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                background: "inherit",
                borderRadius: "inherit",
            },
        },

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