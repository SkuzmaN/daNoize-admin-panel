import React from "react";
import {
    AppBar,
    Toolbar,
    makeStyles,
    Link,
    Container,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    menuWrapper: {
        display: "flex",
        justifyContent: "flex-end",
        flex: 1,
    },
    contentWrapper: {
        marginTop: theme.spacing(2),
    },
}));

export const DashbaordLayout: React.FC = ({ children }) => {
    const styles = useStyles();
    const { t } = useTranslation();
    return (
        <div>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    DaNoize
                    <div className={styles.menuWrapper}>
                        <Link
                            component={NavLink}
                            color="primary"
                            to="/events"
                            exact
                        >
                            {t("dashboard.menu.events")}
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={styles.contentWrapper}>
                <Container>{children}</Container>
            </div>
        </div>
    );
};
