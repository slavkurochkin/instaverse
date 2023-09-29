import React, { useState } from 'react';
import { Card, Tooltip, Typography, Image } from "antd";
import { EditOutlined, DeleteTwoTone, HeartTwoTone } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import moment from 'moment';
import styles from './styles';
import { deleteStory, likeStory } from '../../actions/stories';

const { Meta } = Card;
const { Link, Paragraph, Text } = Typography;

function Story({ story, setSelectedId }) {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(true);

  const user = JSON.parse(localStorage.getItem("profile"));
  // const tags = story?.tags?.split(" ")

  const cardActions = [
    <div style={styles.actions}>
      <Tooltip
        placement='top'
        title='Like'
        color='magenta'
        onClick={() => { dispatch(likeStory(story._id)) }}
      >
        <HeartTwoTone twoToneColor="magenta" />
        &nbsp; {story.likes.length} &nbsp;
      </Tooltip>
    </div>,
    <Tooltip
      placement='top'
      title='Edit'
    >
      <EditOutlined onClick={() => {
        setSelectedId(story._id);
      }} />
    </Tooltip>,
    <Tooltip
      placement='top'
      title='Delete'
      color='red'
    >
      <DeleteTwoTone twoToneColor="red" onClick={() => dispatch(deleteStory(story._id))} />
    </Tooltip>
  ];

  return (
    <Card
      style={styles.card}
      cover={<Image src={story.image} />}
      actions={
        user?.result?._id === story?.userId ?
          cardActions :
          user?.result ?
            cardActions.slice(0, 1)
            : null
      }
    >
      <Meta title={story.username} />
      <Paragraph
        style={{ margin: 0 }}
        ellipsis={{
          rows: 2,
          expandable: true,
          symbol: "more",
          onExpand: () => {
            setExpand(true);
          },
          onEllipsis: () => {
            setExpand(false);
          }
        }}
      >
        {story.caption}
      </Paragraph>
      {expand ?
        <Link href="#">
          {story?.tags?.map((tag) => `#${tag}`).join(" ")}</Link>
        : null }
        <br />
        <Text type="secondary">{story.category}, image taken on the {story.device}</Text>
        <br />
        <Text type="secondary">find it on {story.social}</Text>
        <br />
        <Text type="secondary">{moment(story.postDate).fromNow()}</Text>
    </Card>
  )
}

export default Story