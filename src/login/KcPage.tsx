import "./main.css";
import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { tss } from "tss-react/mui";

const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);
const Login = lazy(() => import("./pages/Login"));

const theme = createTheme({
    palette: {
        mode: "dark"
    }
});

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    return (
        <ThemeProvider theme={theme}>
            <KcPageContextualized {...props} />
        </ThemeProvider>
    );
}

function KcPageContextualized(props: { kcContext: KcContext }) {
    const { kcContext } = props;
    const { i18n } = useI18n({ kcContext });
    const { classes } = useStyles();

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <Login
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const useStyles = tss.create({
    kcHtmlClass: {
        ":root": {
            colorScheme: "dark"
        }
    },
    kcBodyClass: {
        backgroundColor: theme.palette.background.default
    }
} satisfies { [key in ClassKey]?: unknown });
