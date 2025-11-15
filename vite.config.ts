import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            accountThemeImplementation: "none",
            themeName: "keycloak-blazor-management",
            keycloakVersionTargets: {
                "22-to-25": false,
                "all-other-versions": `${pkg.name}-${pkg.version}.jar`
            }
        })
    ]
});
