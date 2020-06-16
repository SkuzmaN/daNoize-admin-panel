import React, { useState } from "react";
import {
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControlLabel,
    Radio,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import EditIcon from "@material-ui/icons/Edit";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { RadioGroup } from "formik-material-ui";
import {
    EventStatus,
    useStartEventMutation,
    useStopEventMutation,
    useSetEventAsUpcomingMutation,
} from "../../../api";

type ChangeStatusFormData = {
    status: string;
};

interface ChangeStatusProps {
    defaultStatus?: EventStatus;
    event: string;
}

export const ChangeStatus: React.FC<ChangeStatusProps> = ({
    event,
    defaultStatus = "",
}) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [startEvent] = useStartEventMutation();
    const [stopEvent] = useStopEventMutation();
    const [setEventAsUpcoming] = useSetEventAsUpcomingMutation();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (data: ChangeStatusFormData) => {
        let mutation;
        switch (data.status) {
            case EventStatus.Upcoming:
                mutation = setEventAsUpcoming;
                break;
            case EventStatus.Live:
                mutation = startEvent;
                break;
            default:
                mutation = stopEvent;
        }
        await mutation({
            variables: {
                event,
            },
        });
        handleClose();
    };

    const initialValues: ChangeStatusFormData = {
        status: defaultStatus,
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
                    {t("eventDetails.changeStatus.title")}
                </DialogTitle>
                <Formik<ChangeStatusFormData>
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <DialogContent>
                                <Field component={RadioGroup} name="status">
                                    <FormControlLabel
                                        value={EventStatus.Upcoming}
                                        control={
                                            <Radio disabled={isSubmitting} />
                                        }
                                        label={t("eventStatuses.upcoming")}
                                        disabled={isSubmitting}
                                    />
                                    <FormControlLabel
                                        value={EventStatus.Live}
                                        control={
                                            <Radio disabled={isSubmitting} />
                                        }
                                        label={t("eventStatuses.live")}
                                        disabled={isSubmitting}
                                    />
                                    <FormControlLabel
                                        value={EventStatus.Archived}
                                        control={
                                            <Radio disabled={isSubmitting} />
                                        }
                                        label={t("eventStatuses.archived")}
                                    />
                                </Field>
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
