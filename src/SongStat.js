import logo from './azi.png';
import './App.css';
import { Accordion, Button, Form, InputGroup, Spinner } from 'react-bootstrap'
import Foot from './Foot';
import React from "react";
import InfiniteScroll from 'react-infinite-scroller';
import BroadcastItem from './BroadcastItem';

class SongStat extends React.Component {
    state = { 
        broadcasts: [],
        hasMore: true
    };

    loadMore = () => {
        console.log("Load more broadcasts")
        fetch(`https://api.schwarzer.wang/azi/broadcasts?skip=${this.state.broadcasts.length}&take=10`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    broadcasts: this.state.broadcasts.concat(data.broadcasts),
                    hasMore: data.hasMore
                });
            })
    };

    render() {

        var items = this.state.broadcasts.map((a, i) => <BroadcastItem broadcast={a} key={i} id={i} />)

        return (
            <div className='width-95p-800'>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={this.state.hasMore}
                    loader={
                        <div style={{ paddingTop: '20px' }}>
                            <Spinner animation="border" variant="light" >
                            </Spinner>
                            <div style={{ color: "#f8f9fa" }}>
                                加载中
                            </div>
                        </div>
                    }
                >
                    <Accordion defaultActiveKey={0}>
                        {items}
                    </Accordion>
                </InfiniteScroll>
            </div>
        );
    }
}

export default SongStat;
