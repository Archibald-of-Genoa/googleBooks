import path from "path";
import { fileURLToPath } from "url";
import {colors} from "./src/styles/colors"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  content: [path.resolve(__dirname, "./index.html"), path.resolve(__dirname, "./src/**/*.{js,ts}")],
  theme: {
    colors: {
      ...colors,
    },
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {
      container: {
        center: true,
        screens: {
          lg: "1440px",
        },
      },
      width: {
        93: "23.25rem",
        1440: "1440px",
      },
    },
  },
  plugins: [],
};
