import { Navbar, Nav, Form, InputGroup, Button, Container, OverlayTrigger, Popover, Overlay, ButtonGroup } from 'react-bootstrap'
import React, { createRef, useRef } from "react";

class AppBar extends React.Component {
  state = {
    searchText: '',
  };

  constructor(props) {
    super(props)
    this.ref = createRef()
  }

  onSearch = (t) => {
    console.log(t)
    window.location = `/search/${t}`
  }

  onPreSearch = (q) => {
    this.setState({ searchText: q })
    if (q.length > 0) {
      fetch(`https://api.schwarzer.wang/azi/search/pre?q=${q}`)
        .then(resp => resp.json())
        .then(body => {
          this.setState({ preSearch: body.names })
        })
    } else {
      this.setState({ preSearch: [] })
    }
  }

  render() {
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

              <Form className="d-flex" ref={this.ref} onSubmit={(e) => {
                e.preventDefault();
                this.onSearch(this.state.searchText)
                e.stopPropagation();
              }
              }>
                <InputGroup className="me-2">
                  <Form.Control
                    placeholder="身骑白马"
                    value={this.state.searchText}
                    onChange={(e) => this.onPreSearch(e.target.value)} />
                  <Button variant="primary" onClick={() => this.onSearch(this.state.searchText)}>搜索</Button>
                </InputGroup>
              </Form>
              <Overlay container={this.ref} target={this.ref} show={this.state.preSearch && this.state.preSearch.length > 0} placement="bottom-start">
                <Popover id="popover-contained">
                  {this.state.preSearch ?
                    <ButtonGroup vertical size="sm">
                      {
                        this.state.preSearch.map((a, i) => {
                          return <Button key={i} id={i} onClick={() => this.onSearch(a)}>
                            {a}
                          </Button>
                        })
                      }
                    </ButtonGroup>
                    : <></>}
                </Popover>
              </Overlay>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AppBar;
