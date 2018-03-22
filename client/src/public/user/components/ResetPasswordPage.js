import React, { Component } from 'react'
import { Button, Form, Segment, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';

class LoginPage extends Component {
    componentDidMount() {
        this.props.handleToken(this.props.match.params.token)
    }
    render() {
        return (
            <I18n ns="translations">
                { (t, { i18n }) => (
                    <div className="ui main text container">
                        <h1 className="ui header">Reset Password</h1>

                        <Form size="large" error={!!this.props.error} success={!!this.props.success} onSubmit={this.props.submit}>
                          <Segment stacked>

                            <Form.Input
                              fluid
                              icon="lock"
                              iconPosition="left"
                              placeholder={t('Password')}
                              type="password"
                              name="password"
                              onChange={this.props.handleInput}
                            />

                            <Form.Input
                              fluid
                              icon="lock"
                              iconPosition="left"
                              placeholder={t("Password confirmation")}
                              type="password"
                              name="password_confirmation"
                              onChange={this.props.handleInput}
                            />

                            <Button fluid size="large">{t("Reset Password")}</Button>
                          </Segment>

                        <Message error
                            header="Error"
                            content="Check errors"
                        />

                          { this.props.errors && this.props.errors.password ? (
                              <div className="eight wide column">
                                  <Message
                                      error
                                      header={t('Password rules')}
                                      list={[
                                          t('Minimum of 6 characters'),
                                          t('Must match the confirmation field')
                                      ]}
                                  />
                              </div>
                          ) : null }

                          <Message success
                              header="Success"
                              content="The password was reset. You can now login."
                          />

                          <p>
                              <Link to="/login">{t("Back to login")}</Link>
                          </p>

                        </Form>
                  </div>
              )}
          </I18n>
        )
    }
}

export default LoginPage
