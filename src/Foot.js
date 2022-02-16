import { ButtonGroup, ToggleButton, Button } from 'react-bootstrap'

function Foot() {
    return (
        <div style={{ fontSize: "15px", paddingTop: "20px",  paddingBottom: "20px"  }}>
            <Button size='sm' variant="outline-primary" href="https://beian.miit.gov.cn">苏ICP备17049545号</Button>{' '}
            <ButtonGroup>
                <ToggleButton variant='outline-warning' size='sm'>
                    小孩梓
                </ToggleButton>
                <ToggleButton variant='warning' size='sm' >
                    20
                </ToggleButton>
            </ButtonGroup> 
        </div>
    );
}

export default Foot;
