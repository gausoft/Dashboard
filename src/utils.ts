import { app } from './main';

export async function getCompleteUrlPath(): Promise<string> {

    if (process.env.PORT)
        return 'http://nemesis-dashboard-api.herokuapp.com/';
    return await app.getUrl() + '/';

}

export function decodeHeader(headers: Headers): string {
    let result = headers['authorization'];
    const decode = (str: string): string => Buffer.from(str, 'base64').toString('binary');
    result = result.split(' ')[1];
    
    return decode(result).split(":")[0];
}

export const services = {
    intranet: "intranet",
    weather: "weather",
    twitter: "twitter",
    crypto: "crypto",
    youtube: "youtube",
    github: "github",
}

export const servicesNames = [services.intranet, services.weather, services.twitter, services.crypto, services.youtube, services.github];
