import React, { useState } from "react";
import { useDispatch } from "react-redux";
import StoryList from '../StoryList';
import StorySearch from '../StorySearch'
import StoryForm from "../StoryForm";
// import StorySearch from "../StorySearch";
import { Layout } from "antd";
import styles from './styles';
import { getStories } from "../../actions/stories";

const { Sider, Content } = Layout;

const Home = () => {
    const [selectedId, setSelectedId] = useState(null);
    const dispatch = useDispatch();
    
/** 
    if (isTagged) {
        dispatch(fetchStoriesByTag('test'));
    } else {
        dispatch(getStories());
    }
*/
    dispatch(getStories());

    return (
        <Layout>
            <Sider style={styles.sider} width={400}>
                <StoryForm selectedId={selectedId} setSelectedId={setSelectedId}/>
            </Sider>
            <Content style={styles.content}>
                <StorySearch/>
                
                <StoryList setSelectedId={setSelectedId}/>
            </Content>
        </Layout>
    )
}

export default Home;