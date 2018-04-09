import React, { Component } from 'react';
import { Grid, Image, Header, Message } from 'semantic-ui-react';
import imgLogo from '../../assets/images/logo.png';

class SplashScreen extends Component {
    render() {
        return (
            <div className="login-form">
                <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                        height: 100%;
                    }
                    `}</style>
                <Grid
                    textAlign="center"
                    style={{ height: '100%' }}
                    verticalAlign="middle"
                    >
                        <Grid.Column style={{ maxWidth: 450 }}>

                            <Header as="h2" textAlign="center">
                                <Image src={imgLogo} style={{width: '200px'}} />
                            </Header>

                            <Message
                                header=""
                                content="Loading..."
                            />

                        </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default SplashScreen;
