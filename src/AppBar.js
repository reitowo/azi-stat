import { Navbar, Nav, Form, InputGroup, Button, Container, OverlayTrigger, Popover } from 'react-bootstrap'
import React from "react";

class AppBar extends React.Component {
  state = {
    searchText: '',
  };


  onSearch = () => {
    console.log(this.state.searchText)
  }

  render() {
    const popover = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">搜索{this.state.searchText}</Popover.Header>
        <Popover.Body>
          搜索功能还在开发中
        </Popover.Body>
      </Popover>
    );

    return (
      <>
        <Navbar bg="light" style={{ paddingLeft: '10px' }} expand='sm'>
          <Container fluid>
            <Navbar.Brand href="/">
              <img
                alt=""
                src="/icon.jpg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              阿梓从小就很可爱
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/stat">歌曲统计</Nav.Link>
              </Nav>

              <Form className="d-flex" >
                <InputGroup className="me-2">
                  <Form.Control
                    placeholder="身骑白马"
                    value={this.state.searchText}
                    onChange={(e) => this.setState({ searchText: e.target.value })} />

                  <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                    <Button variant="primary" onClick={this.onSearch}>搜索</Button>
                  </OverlayTrigger>
                </InputGroup>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AppBar;
