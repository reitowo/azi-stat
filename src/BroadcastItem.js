import { Accordion, Button, Form, InputGroup, Image, Placeholder, Badge, Table } from 'react-bootstrap'
import React from "react"; 
import moment from 'moment';

class BroadcastItem extends React.Component {

    state = {
        songs: null
    };

    constructor(props) {
        super(props)
        if (props.id == 0)
            this.getSongs()
        this.startTime = new Date(this.props.broadcast.startTime)
        this.endTime = this.props.broadcast.endTime ? new Date(this.props.broadcast.endTime) : null
    }

    getSongs = () => {
        if (this.state.songs == null) {
            fetch(`https://api.schwarzer.wang/azi/songs?broadcast=${this.props.broadcast.id}`)
                .then(resp => resp.json())
                .then(body => {
                    this.setState({ songs: body })
                })
        }
    }

    render() {
        if (this.props.broadcast) {
            if (this.state.songs == null) {
                var song = <>
                    <Placeholder animation="wave">
                        <Placeholder xs={4} /> <br />
                        <Placeholder xs={6} /> <br />
                        <Placeholder xs={5} /> <br />
                        <Placeholder xs={3} /> <br />
                    </Placeholder>
                </>

            } else if (this.state.songs.length == 0) {
                var song = <>
                    本场直播没有歌曲记录
                </>
            } else {
                var song = <Table striped bordered hover size="sm">
                    <thead>
                        <tr style={{fontSize: '1.2vmax'}}>
                            <th>歌曲名</th>
                            <th>版本</th>
                            <th>时间</th>
                            <th>轴</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.songs.map(a => {
                            var t = new Date(a.time)
                            var d = t - this.startTime
                            var minutes = Math.floor(d / 1000 / 60)
                            var hour = Math.floor(minutes / 60)
                            var minute = minutes % 60
                            return <tr style={{fontSize: '1vmax'}}>
                                <td>{a.name}</td>
                                <td>{a.artist}</td>
                                <td><Badge bg="secondary">{moment(t).format("HH:mm")}</Badge></td>
                                <td><Badge bg="primary">+{hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')}</Badge></td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            }

            return (
                <Accordion.Item eventKey={this.props.id}>
                    <Accordion.Header onClick={this.getSongs}>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{ maxWidth: '100px'}}>
                                        <Image fluid rounded thumbnail src={this.props.broadcast.cover} referrerPolicy="no-referrer" />
                                    </td>
                                    <td style={{ width: 'auto', paddingLeft: '10px' }}>
                                        <table> 
                                            <tbody>
                                                <tr>
                                                    <td style={{ fontSize: '20px' }}>{this.props.broadcast.title}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontSize: '1vmax' }}>{moment(this.startTime).format('YYYY/MM/DD')}</td>
                                                </tr>
                                                <tr>
                                                    <td style={{ fontSize: '1vmax' }}>{moment(this.startTime).format('HH:mm')}{this.endTime ? ' - ' + moment(this.endTime).format('HH:mm') : ''}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Accordion.Header>
                    <Accordion.Body>
                        {song}
                    </Accordion.Body>
                </Accordion.Item>
            );
        }
        else {
            return (
                <></>
            );
        }

    }
}

export default BroadcastItem;