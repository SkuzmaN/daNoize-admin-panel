import React from "react";
import { useEventsListQuery } from "../features/api/graphql";
import { EventList } from "../features/events/components/EventList";
import { CircularProgress } from "@material-ui/core";

export const EventsPage: React.FC = () => {
    const { loading, error, data } = useEventsListQuery();
    if (loading) {
        return <CircularProgress color="primary" size={40} />;
    }
    return <EventList items={data?.events || []} />;
};
