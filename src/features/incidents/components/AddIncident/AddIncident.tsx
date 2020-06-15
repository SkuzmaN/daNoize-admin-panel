import React from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { TextField } from "formik-material-ui";
import { useTranslation } from "react-i18next";
import { Grid, Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useAddIncidentMutation } from "../../../api";

type AddIncidentFormData = {
    message: string;
};

const initialValues = {
    message: "",
};

interface AddIncidentProps {
    eventUuid: string;
}

export const AddIncident: React.FC<AddIncidentProps> = ({ eventUuid }) => {
    const { t } = useTranslation();
    const [addIncident] = useAddIncidentMutation();

    const handleSubmit = async (
        data: AddIncidentFormData,
        helper: FormikHelpers<AddIncidentFormData>
    ) => {
        await addIncident({
            variables: {
                event: eventUuid,
                variables: JSON.stringify(data),
            },
        });
        helper.resetForm();
    };
    return (
        <Formik<AddIncidentFormData>
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({ submitForm }) => (
                <Form>
                    <Grid container spacing={3}>
                        <Grid item xs={9}>
                            <Field
                                component={TextField}
                                name="message"
                                fullWidth
                                multiline
                                label={t("addIncident.message")}
                                variant="outlined"
                                onKeyDown={(
                                    evt: React.KeyboardEvent<HTMLInputElement>
                                ) => {
                                    if (evt.key === "Enter" && !evt.shiftKey) {
                                        evt.preventDefault();
                                        submitForm();
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                color="primary"
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                endIcon={<SendIcon />}
                            >
                                {t("addIncident.submit")}
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};
