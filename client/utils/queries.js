import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query Me {
    me {
        _id
        username
        email
        items {
            _id
            name
            description
            value
        }
    }
}
`;

export const QUERY_ITEM = gql`
query Item($userId: ID!, $itemId: ID!) {
    item(userId: $userId, itemId: $itemId) {
        _id
        name
        description
        value
    }
}
`;