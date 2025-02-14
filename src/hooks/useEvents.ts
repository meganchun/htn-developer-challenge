import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_ALL_EVENTS, GET_EVENT_BY_ID } from "@/graphql/queries/EventsQueries";
import { TEvent } from "@/types/types";
import { useMemo } from "react";

export function useEvent() {
    const [getEvent, { data, loading, error }] = useLazyQuery(GET_EVENT_BY_ID);
    return { getEvent, data, loading, error };
}

export function useAllEvents() {
    const { data, loading, error } = useQuery(GET_ALL_EVENTS);

    return useMemo(() => ({
        events: data?.sampleEvents || [],
        loading,
        error
    }), [data, loading, error]);
}