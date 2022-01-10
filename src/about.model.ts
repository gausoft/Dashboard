import * as ip from 'ip';

export const aboutJson = {
  client: {
      host: ip.address(),
    },
    server: {
      current_time: Date.now(),
      services: [
        {
          name: 'intranet',
          widgets: [
            {
              name: 'me',
              description: 'Get basic information about your intranet account',
              params: {
                name: 'autologin',
                type: 'string',
              }
            },
            {
              name: 'plans',
              description: 'Get the 5 lastest events in your intranet planning',
              params: {
                name: 'autologin',
                type: 'string',
              }
            },
          ]
        },
        {
          name: 'youtube',
          widgets: [
            {
              name: 'favorite',
              description: 'Display the lastest videos of your favorites Youtube channel',
              params: {
                name: 'channel url',
                type: 'string',
              }
            },
            {
              name: 'mood',
              description: 'Retrieve a bunch of videos related to your favorites keywords',
              params: {
                name: 'keyword',
                type: 'string',
              }
            },
          ]
        },
        {
          name: 'github',
          widgets: [
            {
              name: 'repos',
              description: 'The 5 lasted repository from a specific github account',
              params: {
                name: 'github username',
                type: 'string',
              }
            },
            {
              name: 'events',
              description: 'Get a collection of events from github',
              params: {
                name: 'github username',
                type: 'string',
              }
            },
            {
              name: 'pushes',
              description: 'Retrieve push activities on a repository ',
              params: {
                name: 'github repositroy links',
                type: 'string',
              }
            },
          ]
        },
        // {
        //   name: 'twitter',
        //   widgets: [
        //     {
        //       name: 'tl',
        //       description: 'Display the 10 last tweets on your twitter feed',
        //       params: {
        //         name: 'username',
        //         type: 'string',
        //       }
        //     },
        //     {
        //       name: 'favorite',
        //       description: 'Display the last tweet of your favorite user',
        //       params: {
        //         name: 'username',
        //         type: 'string',
        //       }
        //     },
        //   ]
        // },
      ]
    }   
  }