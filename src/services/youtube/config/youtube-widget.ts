export const youtubeWidget = {
    service: {
        name: 'youtube',
        baseUrl: '/services/youtube/'
    },
    favorite: {
        name: 'favorite',
        description: 'Display the lastest videos of your favorites Youtube channel',
        params: {
            name: 'channel url',
            type: 'string',
        },
        baseUrl: '/services/youtube/widgets/favorite',
    },
    mood: {
        name: 'mood',
        description: 'Retrieve a bunch of videos related to your favorites keywords',
        params: {
            name: 'keyword',
            type: 'string',
        },
        baseUrl: '/services/youtube/widgets/mood',
    },
}