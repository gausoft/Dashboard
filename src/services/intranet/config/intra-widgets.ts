export const intraWidget = {
    service: {
      name: 'intranet',
      baseUrl: '/services/intranet/'
    },
    
    me: {
        name: 'me',
        baseUrl: '/services/intranet/widgets/me',
        description: 'Get basic information about your intranet account',
        params: {
          name: 'autologin',
          type: 'string',
        }
    },
    plans: {
        name: 'plans',
        baseUrl: '/services/intranet/widgets/plans',
        description: 'Get the 5 lastest events in your intranet planning',
        params: {
          name: 'autologin',
          type: 'string',
        }
    },
}