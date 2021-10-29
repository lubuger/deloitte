import * as React from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { RouteComponentProps } from 'react-router';

import { ApplicationState } from '../store';
import * as TaskStore from '../store/Task';


type TaskProps =
    TaskStore.TaskState &
    typeof TaskStore.actionCreators &
    RouteComponentProps<{}>;

interface HomeState {
    username: string,
    code: string,
}

class Home extends React.PureComponent<TaskProps, HomeState> {
    constructor(props: TaskProps) {
        super(props);

        this.state = {
            username: '',
            code: '',
        };
    }

    public addTask(username: string, code: string) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, code })
        };
        fetch('http://localhost:23095/api/task', requestOptions)
            .then(response => response.text())
            .then(data => {
                if (data === 'Success') {
                    this.props.addTask(username, code);
                }
            });
    }

    public dismissAlert() {
        this.setState({
            username: '',
            code: '',
        });
        this.props.addTask('', '');
    }

    public render() {
        const {
            username,
            code,
        } = this.state;

        return (
            <div>
                <h1>Code challange</h1>

                <Alert
                    color="info"
                    toggle={() => this.dismissAlert() }
                    isOpen={this.props.username !== '' && this.props.code !== ''}
                >
                    Successfully added your code to database :)
                </Alert>

                <Form>
                    <FormGroup>
                        <Label for="username">
                            Username
                        </Label>
                        <Input
                            id="username"
                            name="username"
                            placeholder="your username"
                            type="text"
                            value={username}
                            onChange={(e) => this.setState({ username: e.target.value })}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="code">
                            Code solution
                        </Label>
                        <Input
                            id="code"
                            name="code"
                            placeholder="Put your code solutiopn here"
                            type="textarea"
                            value={code}
                            onChange={(e) => this.setState({ code: e.target.value })}
                        />
                    </FormGroup>
                </Form>

                <Button color="primary" onClick={() => this.addTask(username, code)}>
                    Click Me
                </Button>

            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.task,
    TaskStore.actionCreators
)(Home);
