import "./main.css";
import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <>
            <TopBar kcContext={kcContext} />
            <Suspense>
                {(() => {
                    switch (kcContext.pageId) {
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
        </>
    );
}

// ...existing code...
function TopBar(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    // Narrow to login page to safely access registrationUrl
    const registrationHref =
        kcContext.pageId === "login.ftl"
            ? (() => {
                  const ctx = kcContext as Extract<KcContext, { pageId: "login.ftl" }>;
                  const { url, registrationDisabled } = ctx;
                  if (registrationDisabled) return undefined;
                  return "registrationUrl" in url ? url.registrationUrl : undefined;
              })()
            : undefined;

    return (
        <div className="app-topbar">
            <div className="app-topbar__inner">
                <div className="app-brand">
                    <div className="app-brand__logo" aria-hidden="true" />
                    <span className="app-brand__name">ManagementApp</span>
                </div>

                <nav className="app-nav">
                    <a href="#" className="app-nav__link">
                        About us
                    </a>
                    {registrationHref && (
                        <a
                            href={registrationHref}
                            className="btn btn-primary app-nav__cta"
                        >
                            Sign up
                        </a>
                    )}
                </nav>
            </div>
        </div>
    );
}

const classes = {
    kcBodyClass: "app-body",
    kcContainerClass: "app-container",
    kcHeaderClass: "app-header",
    kcFormCardClass: "app-card",

    // Form elements
    kcFormGroupClass: "form-group",
    kcLabelClass: "form-label",
    kcInputClass: "form-input",
    kcInputGroup: "input-group",
    kcInputErrorMessageClass: "input-error",
    kcFormOptionsWrapperClass: "form-options",

    // Buttons
    kcButtonClass: "btn",
    kcButtonPrimaryClass: "btn-primary",
    kcButtonBlockClass: "btn-block",
    kcButtonLargeClass: "btn-lg",

    // Password visibility
    kcFormPasswordVisibilityButtonClass: "password-toggle",
    kcFormPasswordVisibilityIconShow: "icon-show",
    kcFormPasswordVisibilityIconHide: "icon-hide",

    // Social
    kcFormSocialAccountSectionClass: "social-section",
    kcFormSocialAccountListClass: "social-list",
    kcFormSocialAccountListGridClass: "social-list-grid",
    kcFormSocialAccountListButtonClass: "social-button",
    kcFormSocialAccountGridItem: "social-item",
    kcFormSocialAccountNameClass: "social-text",
    kcCommonLogoIdP: "social-icon"
} satisfies { [key in ClassKey]?: string };
