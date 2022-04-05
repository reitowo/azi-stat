import logo from './azi.png';
import './App.css';
import { Accordion, Button, Form, InputGroup, Spinner, Table, Badge, Placeholder, Card } from 'react-bootstrap'
import Foot from './Foot';
import React from "react";
import InfiniteScroll from 'react-infinite-scroller';
import BroadcastItem from './BroadcastItem';
import moment from 'moment';

class Search extends React.Component {

    state = {
        songs: null
    }

    constructor(props) {
        super(props)
        var q = this.props.match.params['name']
        if (q) {
            fetch(`https://api.schwarzer.wang/azi/search?q=${q}`)
                .then(a => a.json())
                .then(a => this.setState({ songs: a }))
        } else {
            this.props.history.goBack()
        }
    }

    render() {

        if (this.state.songs == null) {
            var songs = <>
                <Placeholder animation="wave">
                    <Placeholder xs={4} /> <br />
                    <Placeholder xs={6} /> <br />
                    <Placeholder xs={5} /> <br />
                    <Placeholder xs={3} /> <br />
                </Placeholder>
            </>
        } else if (this.state.songs.length == 0) {
            var songs = <Card style={{height: '100px', justifyContent: 'center'}}>
                没有相关记录
            </Card>
        }
        else {
            var songs = this.state.songs.map((b, i) => {
                var song = <Table striped bordered hover size="sm">
                    <thead>
                        <tr style={{ fontSize: '18px' }}>
                            <th>时间</th>
                            <th>歌曲名</th>
                            <th>歌手</th>
                        </tr>
                    </thead>
                    <tbody>
                        {b.songs.map(a => {
                            var t = new Date(a.time) 
                            return <tr style={{ fontSize: '16px' }}>
                                <td>
                                    {moment(t).format("yyyy/MM/DD HH:mm")}
                                </td>
                                <td>{a.url ? <a style={{}} href={a.url}>{a.name}</a> : a.name}</td>
                                <td>{a.artist}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                var latest = b.songs.length === 0 ? null : b.songs[0].time
                return <Accordion.Item eventKey={i} key={i} id={i}>
                    <Accordion.Header>
                        {b.name}
                        <Badge bg="success" style={{ marginLeft: '8px' }}>{b.count}</Badge>
                        {latest ? <Badge bg="primary" style={{ marginLeft: '8px' }}>{moment(latest).format("yyyy/MM/DD")}</Badge> : <></>}
                    </Accordion.Header>
                    <Accordion.Body style={{ paddingBottom: '0px' }}>
                        {song}
                    </Accordion.Body>
                </Accordion.Item>
            })
        }

        return (
            <div className='width-95p-800'>
                <Accordion defaultActiveKey={0}>
                    {songs}
                </Accordion>
            </div>
        );
    }
}

export default Search;
