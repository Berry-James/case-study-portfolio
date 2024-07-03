/**
 * System page routes
 */
export const PAGE_ROUTES = {

    // ROOT
    root: '/',

    // ROOT FOR MOBILE
    mobile: '/mobile',

    // LOGIN
    login: '/login',

    // ARTICLES
    article: (articleId: string) => `/mobile/${articleId}`, 
    // articles: {
    //     sportsScience: '/sports-science',
    //     anomalyReporting: '/anomaly-reporting',
    //     vehicleMonitoring: '/vehicle-monitoring'
    // }

}