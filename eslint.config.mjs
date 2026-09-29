import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
    ...nextCoreWebVitals,
    {
        rules: {
            // Copy is Italian: apostrophes in JSX text are content, not typos.
            "react/no-unescaped-entities": "off",
            // These check code for the React Compiler, which this project does not
            // use; without it the patterns they flag are ordinary, working React.
            "react-hooks/refs": "off",
            "react-hooks/set-state-in-effect": "off",
            "react-hooks/immutability": "off",
            "react-hooks/preserve-manual-memoization": "off",
        },
    },
    {
        ignores: [".next/**", "node_modules/**", "public/**", "next-env.d.ts"],
    },
];

export default eslintConfig;
