export const styles = {
    mainContainer: {
        width: "100%",
        minHeight: "500px",
        marginInline: "auto",
        position: "relative",
        display: "flex",
        overflow: "hidden",
        "&:hover > #ver-mas": {
            transform: "translateX(-50%) translateY(-50%) scale(1)"
        },
        "&:hover > #img > span > #imagen": {
            filter: "blur(8px) !important",
        }
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
        // "&:before": {
        //     content: "''",
        //     zIndex: "-1",
        //     position: "absolute",
        //     top: "0",
        //     right: "0",
        //     bottom: "0",
        //     left: "0",
        //     background: "linear-gradient(0deg, #E85C90 20%, #58EFEC 80%)",
        //     transform: "translate3d(0px, -2px, 0) scale(0)",
        //     filter: "blur(10px)",
        //     opacity: "1",
        //     // transition: "0.5s ease all",
        //     borderRadius: "inherit",
        //     animation: "5s rotating linear infinite"
        // },
        // "@keyframes rotating": {
        //     '0%': {
        //         background: "linear-gradient(0.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '1%': {
        //         background: "linear-gradient(3.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '2%': {
        //         background: "linear-gradient(7.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '3%': {
        //         background: "linear-gradient(10.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '4%': {
        //         background: "linear-gradient(14.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '5%': {
        //         background: "linear-gradient(18.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '6%': {
        //         background: "linear-gradient(21.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '7%': {
        //         background: "linear-gradient(25.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '8%': {
        //         background: "linear-gradient(28.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '9%': {
        //         background: "linear-gradient(32.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '10%': {
        //         background: "linear-gradient(36.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '11%': {
        //         background: "linear-gradient(39.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '12%': {
        //         background: "linear-gradient(43.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '13%': {
        //         background: "linear-gradient(46.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '14%': {
        //         background: "linear-gradient(50.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '15%': {
        //         background: "linear-gradient(54.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '16%': {
        //         background: "linear-gradient(57.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '17%': {
        //         background: "linear-gradient(61.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '18%': {
        //         background: "linear-gradient(64.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '19%': {
        //         background: "linear-gradient(68.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '20%': {
        //         background: "linear-gradient(72.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '21%': {
        //         background: "linear-gradient(75.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '22%': {
        //         background: "linear-gradient(79.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '23%': {
        //         background: "linear-gradient(82.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '24%': {
        //         background: "linear-gradient(86.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '25%': {
        //         background: "linear-gradient(90.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '26%': {
        //         background: "linear-gradient(93.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '27%': {
        //         background: "linear-gradient(97.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '28%': {
        //         background: "linear-gradient(100.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '29%': {
        //         background: "linear-gradient(104.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '30%': {
        //         background: "linear-gradient(108.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '31%': {
        //         background: "linear-gradient(111.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '32%': {
        //         background: "linear-gradient(115.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '33%': {
        //         background: "linear-gradient(118.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '34%': {
        //         background: "linear-gradient(122.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '35%': {
        //         background: "linear-gradient(126.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '36%': {
        //         background: "linear-gradient(129.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '37%': {
        //         background: "linear-gradient(133.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '38%': {
        //         background: "linear-gradient(136.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '39%': {
        //         background: "linear-gradient(140.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '40%': {
        //         background: "linear-gradient(144.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '41%': {
        //         background: "linear-gradient(147.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '42%': {
        //         background: "linear-gradient(151.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '43%': {
        //         background: "linear-gradient(154.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '44%': {
        //         background: "linear-gradient(158.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '45%': {
        //         background: "linear-gradient(162.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '46%': {
        //         background: "linear-gradient(165.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '47%': {
        //         background: "linear-gradient(169.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '48%': {
        //         background: "linear-gradient(172.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '49%': {
        //         background: "linear-gradient(176.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '50%': {
        //         background: "linear-gradient(180.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '51%': {
        //         background: "linear-gradient(183.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '52%': {
        //         background: "linear-gradient(187.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '53%': {
        //         background: "linear-gradient(190.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '54%': {
        //         background: "linear-gradient(194.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '55%': {
        //         background: "linear-gradient(198.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '56%': {
        //         background: "linear-gradient(201.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '57%': {
        //         background: "linear-gradient(205.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '58%': {
        //         background: "linear-gradient(208.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '59%': {
        //         background: "linear-gradient(212.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '60%': {
        //         background: "linear-gradient(216.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '61%': {
        //         background: "linear-gradient(219.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '62%': {
        //         background: "linear-gradient(223.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '63%': {
        //         background: "linear-gradient(226.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '64%': {
        //         background: "linear-gradient(230.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '65%': {
        //         background: "linear-gradient(234.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '66%': {
        //         background: "linear-gradient(237.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '67%': {
        //         background: "linear-gradient(241.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '68%': {
        //         background: "linear-gradient(244.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '69%': {
        //         background: "linear-gradient(248.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '70%': {
        //         background: "linear-gradient(252.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '71%': {
        //         background: "linear-gradient(255.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '72%': {
        //         background: "linear-gradient(259.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '73%': {
        //         background: "linear-gradient(262.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '74%': {
        //         background: "linear-gradient(266.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '75%': {
        //         background: "linear-gradient(270.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '76%': {
        //         background: "linear-gradient(273.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '77%': {
        //         background: "linear-gradient(277.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '78%': {
        //         background: "linear-gradient(280.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '79%': {
        //         background: "linear-gradient(284.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '80%': {
        //         background: "linear-gradient(288.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '81%': {
        //         background: "linear-gradient(291.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '82%': {
        //         background: "linear-gradient(295.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '83%': {
        //         background: "linear-gradient(298.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '84%': {
        //         background: "linear-gradient(302.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '85%': {
        //         background: "linear-gradient(306.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '86%': {
        //         background: "linear-gradient(309.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '87%': {
        //         background: "linear-gradient(313.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '88%': {
        //         background: "linear-gradient(316.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '89%': {
        //         background: "linear-gradient(320.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '90%': {
        //         background: "linear-gradient(324.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '91%': {
        //         background: "linear-gradient(327.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '92%': {
        //         background: "linear-gradient(331.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '93%': {
        //         background: "linear-gradient(334.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '94%': {
        //         background: "linear-gradient(338.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '95%': {
        //         background: "linear-gradient(342.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '96%': {
        //         background: "linear-gradient(345.60deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '97%': {
        //         background: "linear-gradient(349.20deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '98%': {
        //         background: "linear-gradient(352.80deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '99%': {
        //         background: "linear-gradient(356.40deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        //     '100%': {
        //         background: "linear-gradient(360.00deg, #E85C90 20%, #58EFEC 80%) "
        //     },
        // },
        // "&::after": {
        //     content: "''",
        //     zIndex: "-1",
        //     position: "absolute",
        //     top: "0",
        //     right: "0",
        //     bottom: "0",
        //     left: "0",
        //     background: "inherit",
        //     borderRadius: "inherit",
        // },
        // "&:hover": {
        //     "&:before": {
        //         content: "''",
        //         transform: "translate3d(0px, -2px, 0) scale(1)",
        //     },
        // }
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