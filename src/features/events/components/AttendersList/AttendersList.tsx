import React from "react";
import { Attender } from "./types";
import { AttenderListItem } from "./AttenderListItem";

interface AttendersListProps {
    items: Attender[];
}

export const AttendersList: React.FC<AttendersListProps> = ({ items }) => {
    return (
        <>
            {items.map((attender) => (
                <AttenderListItem key={attender.uuid} item={attender} />
            ))}
        </>
    );
};
