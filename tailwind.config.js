/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        abyss: "#06070a",
        ink: "#0a1020",
        night: "#101827",
        slate: "#8ea0bd",
        mist: "#dfe8f7",
        glow: "#78a7ff",
        ember: "#9bb8ff"
      },
      fontFamily: {
        sans: ['"Sora"', '"Avenir Next"', '"Segoe UI"', "sans-serif"],
        display: ['"Clash Display"', '"Avenir Next"', '"Sora"', "sans-serif"],
        serif: ['"Cormorant Garamond"', '"Georgia"', "serif"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(6, 12, 24, 0.45)",
        glow: "0 0 0 1px rgba(120, 167, 255, 0.2), 0 12px 40px rgba(88, 128, 214, 0.24)",
        card: "0 30px 120px rgba(3, 6, 14, 0.48)"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, rgba(61, 89, 150, 0.28), transparent 34%), radial-gradient(circle at 80% 20%, rgba(120, 167, 255, 0.16), transparent 28%), linear-gradient(180deg, #05070b 0%, #070b12 28%, #05070b 100%)"
      },
      letterSpacing: {
        cinematic: "0.18em"
      },
      animation: {
        float: "float 10s ease-in-out infinite",
        pulseSoft: "pulseSoft 5s ease-in-out infinite",
        scroll: "scroll 2.8s ease-in-out infinite",
        drift: "drift 14s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.85" }
        },
        scroll: {
          "0%": { transform: "translateY(0px)", opacity: "0.5" },
          "50%": { transform: "translateY(10px)", opacity: "1" },
          "100%": { transform: "translateY(0px)", opacity: "0.5" }
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" }
        }
      }
    }
  },
  plugins: []
};
