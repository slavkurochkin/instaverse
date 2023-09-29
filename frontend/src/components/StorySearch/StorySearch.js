import {Input} from "antd";
import { useDispatch } from "react-redux";
import styles from './styles';
import { getStories, fetchStoriesByTag } from '../../actions/stories';

const { Search } = Input;
// let searchTag = 'All';

export default function StorySearch() {
    const dispatch = useDispatch();
    // const [isTagged, setIsTagged] = useState(true);
    
    const onSearch = (value) => {
        console.log(value)    
        if(value){
            dispatch(fetchStoriesByTag(value));
    
        } else {
            dispatch(getStories());
        }
       
    };
    
    return (
    <div>
        <div style={styles.search}>
        <Search
            placeholder="Search by tag"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
        />
        </div>
    </div>
    
    )
}