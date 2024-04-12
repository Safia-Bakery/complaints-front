module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        mainGray: "#f5f5f5",
        lightBrown: "#BEA087",
        textColor: "#0000008C",
        primary: "#3898EC",
        borderColor: "#E2DAB6",

        mainBlack: "#151C28",
        mainGreen: "#0DA06A",
        borderGray: "#E7E7E7",
      },
      boxShadow: {
        selected: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },

  plugins: [],
};
