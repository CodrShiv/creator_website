// IMPORTS
const axios = require("axios"),
  express = require("express"),
  app = express(),
  cors = require("cors"),
  dotenv = require("dotenv"),
  serverless = require("serverless-http"),
  router = express.Router();

// ENVIRONMENT VARIABLES

dotenv.config();

const YT_AUTH = process.env.YT_AUTH,
  YT_ID = process.env.YT_ID,
  YT__EP = process.env.YT__EP,
  TWITTER_AUTH = process.env.TWITTER_AUTH,
  TWITTER_ID = process.env.TWITTER_ID,
  IG_AUTH = process.env.IG_AUTH,
  IG_MEDIA__EP = process.env.IG_MEDIA__EP,
  IG_COUNT__EP = process.env.IG_COUNT__EP,
  IG_USER = process.env.IG_USER,
  IG_USER_AGENT = process.env.IG_USER_AGENT,
  TWITTER__EP = process.env.TWITTER__EP;

let respond;

app.use(cors({ origin: "*" }));
let data = {};

const getData = () => {
  let res;
  const API = async () => {
    res = await axios.get(`${IG_MEDIA__EP}${IG_AUTH}`);
    data.ig = { media: res.data.data };

    res = await axios.get(`${IG_COUNT__EP}${IG_USER}`, {
      headers: {
        "user-agent": IG_USER_AGENT,
      },
    });
    data.ig.count = res.data.data.user.edge_followed_by.count;
    res = await axios.get(
      `${TWITTER__EP}${TWITTER_ID}?user.fields=public_metrics,profile_image_url`,
      {
        headers: {
          Authorization: TWITTER_AUTH,
        },
      }
    );
    data.twitter = {
      count: res.data.data.public_metrics.followers_count,
      pic_url: res.data.data.profile_image_url,
    };
    res = await axios.get(
      `${TWITTER__EP}${TWITTER_ID}/tweets?tweet.fields=created_at,text&expansions=attachments.media_keys&media.fields=preview_image_url,url`,
      {
        headers: {
          Authorization: TWITTER_AUTH,
        },
      }
    );
    data.twitter.media = res.data;

    res = await axios.get(
      `${YT__EP}/channels?part=id,snippet,statistics&id=${YT_ID}&key=${YT_AUTH}`
    );
    data.yt = {
      pic_url: res.data.items[0].snippet.thumbnails.high.url,
      count: res.data.items[0].statistics.subscriberCount,
    };

    res = await axios.get(
      `${YT__EP}/search?key=${YT_AUTH}&channelId=${YT_ID}&part=snippet,id&order=date&maxResults=30`
    );
    data.yt.media = res.data.items;
    data.time = new Date().getTime();

    respond(data);
  };
  if (data && new Date().getTime() - data.time <= 60000) {
    respond(data);
  } else {
    API();
  }
};

router.get("/", (req, res) => {
  respond = (data) => {
    res.status(200);
    res.send(JSON.stringify(data));
  };
  getData();
});
app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);
