import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

export default function ListTweets() {
  return (
    <div>
      <TwitterTimelineEmbed
        sourceType="url"
        url="https://twitter.com/CoronavirusBra1"
        options={{ height: 400, width: 600 }}
      />
    </div>
  );
}
