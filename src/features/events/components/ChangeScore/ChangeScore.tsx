import React, { useState } from "react";
import {
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { TextField } from "formik-material-ui";
import { useChangeScoreMutation } from "../../../api";

type ChangeScoreFormData = {
    score: number;
};

interface ChangeScoreInterface {
    defaultScore: number;
    teamName: string;
    attenderUuid: string;
}

export const ChangeScore: React.FC<ChangeScoreInterface> = ({
    defaultScore,
    teamName,
    attenderUuid,
}) => {
    const { t } = useTranslation();
    const [changeScore] = useChangeScoreMutation();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const initialValues = {
        score: defaultScore,
    };

    const handleSubmit = async (
        { score }: ChangeScoreFormData,
        helper: FormikHelpers<ChangeScoreFormData>
    ) => {
        await changeScore({
            variables: {
                score: score,
                attender: attenderUuid,
            },
        });
        handleClose();
    };

    return (
        <>
            <IconButton aria-label="edit" onClick={handleOpen}>
                <EditIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {t("eventDetails.changeScore.title", { team: teamName })}
                </DialogTitle>
                <Formik<ChangeScoreFormData>
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <DialogContent>
                                <Field
                                    component={TextField}
                                    name="score"
                                    type="number"
                                    label={t("eventDetails.changeScore.score")}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    type="button"
                                    onClick={handleClose}
                                    color="primary"
                                    disabled={isSubmitting}
                                >
                                    {t("eventDetails.changeScore.cancel")}
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                    disabled={isSubmitting}
                                >
                                    {t("eventDetails.changeScore.submit")}
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    );
};
