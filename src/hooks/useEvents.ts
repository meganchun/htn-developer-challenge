import { useQuery } from "@apollo/client";
import { GET_ALL_EVENTS, GET_EVENT_BY_ID } from "@/graphql/queries/EventsQueries";

export function useEvent(id: number) {
    const { data, loading, error } = useQuery(GET_EVENT_BY_ID, { variables: { id } });
  
    return { user: data?.event, loading, error };
}

export function useAllEvents() {
    const { data, loading, error } = useQuery(GET_ALL_EVENTS);
  
    return { events: data?.event, loading, error };
}