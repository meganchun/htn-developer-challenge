import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = gql`
    query sampleEvents {
        sampleEvents {
            id
            name
            event_type
            permission
            start_time
            end_time
            description
            speakers {
                name
            }
            public_url
            private_url
            related_events
        }
    }
`;

export const GET_EVENT_BY_ID = gql`
    query sampleEvent($id: Float!) {
        sampleEvent(id: $id) {
            id
            name
            event_type
            permission
            start_time
            end_time
            description
        }
    }
`;