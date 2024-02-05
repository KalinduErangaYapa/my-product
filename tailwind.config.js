import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";
import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            colors: {
                primary: "#0e10ee",
                secondary: "#0e10ee",
                tBlue: "#0B0B42",
                tDark: "#030E2A",
                pBg: "#0c1015",
                sBg: "#161b22",
                pText: "#000000",
                sText: "#CCC9C9",
                pBorder: "#30363d",
            },
            fontFamily: {
                display: ["'Roboto'", "sans-serif"],
                body: ["'Roboto'", "sans-serif"],
            },
            borderRadius: {
                primary: "16px",
            },
            fontSize: {
                h1: "70px",
            },
            animation: {
                "spin-slow": "spin 120s linear infinite",
            },
            boxShadow: {
                card: "0rem 0.125rem 0.25rem #1f21241a,0rem 0.0625rem 0.375rem #1f21240d",
                cardTwo: "1px 3px 22px -3px rgba(0, 0, 0, 0.19)",
            },
        },
    },

    plugins: [forms, aspectRatio, typography, containerQueries],
};
