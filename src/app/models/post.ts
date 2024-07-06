export interface Post {
    title: string,
    image: string,
    link: string,
    like: number,
    dislike: number,
    comment: number,
    subredditName: string,
    author: string,
    dateCreated_UTC: Date,
    subreddit: string,
    id: string,
    voteRatio: number,
    nsfw: boolean
}
