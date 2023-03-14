import React, { useState, useEffect } from "react";

import swal from "sweetalert";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import "./App.scss";

const ALL_MEMBERS_URL = "http://localhost:3001/all_members";
const CREATE_CHANNEL_URL = "http://localhost:3001/create_channel";

const animatedComponents = makeAnimated();

function AddChannel() {
  const [members, setMembers] = useState([]);
  const [isMembersSelectShown, setisMembersSelectShown] = useState(false);
  const [selectedMembers, setselectedMembers] = useState("");
  const [channelInfo, setChannelInfo] = useState({ name: "", topic: "" });

  useEffect(() => {
    fetch(ALL_MEMBERS_URL)
      .then((res) => res.json())
      .then((data) => setMembers(data.ids));
  }, []);

  const options =
    members.length > 0
      ? members.map((member) => ({ value: member, label: member }))
      : [];

  const handleInputChange = (event) => {
    setChannelInfo({ ...channelInfo, [event.target.name]: event.target.value });
  };

  const onAddChannelButtonClick = () =>
    setisMembersSelectShown((current) => !current);

  async function createChannel(details) {
    return fetch(CREATE_CHANNEL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    }).then((data) => data.json());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await createChannel({
      username: localStorage.getItem("userName"),
      channel_id: channelInfo.name,
      channel_topic: channelInfo.topic,
      chat_members: selectedMembers.map((member) => member["value"]),
    });

    if (response.status) {
      setisMembersSelectShown((current) => !current);
      setChannelInfo({ name: "", topic: "" });

      swal("Success", response.message, "success", {
        buttons: false,
        timer: 1500,
      });
    } else {
      swal("Failed", response.message, "error");
    }
  };

  return (
    <div>
      <button type="button" onClick={onAddChannelButtonClick}>
        Add Channel
      </button>

      {isMembersSelectShown && (
        <div>
          <form onSubmit={handleSubmit} className="tralala">
            <label>
              <input
                type="text"
                name="name"
                placeholder="Channel name"
                value={channelInfo.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <input
                type="text"
                name="topic"
                placeholder="Channel Topic"
                value={channelInfo.topic}
                onChange={handleInputChange}
              />
            </label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={options}
              onChange={(choice) => setselectedMembers(choice)}
            />

            <button type="submit" style={{ margin: "2% 0" }}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddChannel;
