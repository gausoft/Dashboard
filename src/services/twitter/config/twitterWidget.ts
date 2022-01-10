export const twitterWidget = {
    service: {
        name: 'twitter',
        baseUrl: '/services/twitter/'
    },

    tl: {
        name: 'tl',
        baseUrl: '/services/twitter/widgets/tl',
        description: 'Display the 10 last tweets on your twitter feed',
        params: {
            name: 'username',
            type: 'string',
        }
    },

    favorite: {
        name: 'favorite',
        baseUrl: '/services/twitter/widgets/favorite',
        description: 'Display the last tweet of your favorite user',
        params: {
            name: 'username',
            type: 'string',
        }
    },

}