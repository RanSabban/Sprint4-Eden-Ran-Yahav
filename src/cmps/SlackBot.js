import Slack from '@slack/bolt'
import dotenv from 'dotenv'

dotenv.config()

const app = new Slack.App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN
})

console.log({ app })