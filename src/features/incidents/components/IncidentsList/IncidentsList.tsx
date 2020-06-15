import React from "react";
import { Incident } from "../../types";
import { IncidentsListItem } from "./IncidentsListItem";

interface IncidentsListProps {
    items: Incident[];
}

export const IncidentsList: React.FC<IncidentsListProps> = ({ items }) => {
    return (
        <>
            {items.map((message) => (
                <IncidentsListItem key={message.uuid} item={message} />
            ))}
        </>
    );
};
