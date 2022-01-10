export const githubWidget = {
    service: {
        name: 'github',
        baseUrl: '/services/intranet/'
    },
    repos: {
        name: 'repos',
        description: 'The 5 lasted repository from a specific github account',
        params: {
            name: 'github username',
            type: 'string',
        },
        baseUrl: '/services/github/widgets/repos',

    },
    events: {
        name: 'events',
              description: 'Get a collection of events from github',
              params: {
                name: 'github username',
                type: 'string',
        },
        baseUrl: '/services/intranet/widgets/events',
    },
    pushes: {
        name: 'pushes',
              description: 'Get a collection of events from github',
              params: {
                name: 'github username',
                type: 'string',
        },
        baseUrl: '/services/intranet/widgets/pushes',
    },
    
}