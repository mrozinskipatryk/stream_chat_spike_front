import React from "react";
import {
  Chat as BaseChat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import { useClient } from "./hooks/useClient";

import AddChannel from "./AddChannel";

const PROFILE_IMAGE =
  "https://getstream.io/random_png/?id=shrill-resonance-6&name=shrill-resonance-6";

const sort = { last_message_at: -1 };

const Chat = () => {
  const userToken = localStorage.getItem("accessToken");
  const userName = localStorage.getItem("userName");
  const filters = { type: "messaging", members: { $in: [userName] } };

  const user = {
    id: userName,
    name: userName,
    image: PROFILE_IMAGE,
  };

  const chatClient = useClient({
    apiKey: process.env.REACT_APP_STREAM_API_KEY,
    userData: user,
    tokenOrProvider: userToken,
  });

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <div className="chat-wrapper">
        <BaseChat client={chatClient}>
          <div>
            <AddChannel />
            <ChannelList filters={filters} sort={sort} />
          </div>

          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </BaseChat>
      </div>
    </div>
  );
};

export default Chat;
