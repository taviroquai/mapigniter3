import React, { Component } from 'react'
import { Button, Form, Segment, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { I18n } from 'react-i18next';

class LoginPage extends Component {
    render() {
        return (
            <I18n ns="translations">
                { (t, { i18n }) => (
                    <div className="ui main text container">
                        <h1 className="ui header">Recover Password</h1>

                        <Form size="large" error={this.props.error} success={this.props.success} onSubmit={this.props.submit}>
                          <Segment stacked>
                            <Form.Input
                              fluid
                              icon="user"
                              iconPosition="left"
                              placeholder={t('Email address')}
                              name="email"
                              onChange={this.props.handleChange}
                            />

                            <Button fluid size="large">{t('Start Recover Password')}</Button>
                          </Segment>

                          <Message error
                              header={t('Error')}
                              content={t("Wrong email or the account is not enabled")}
                          />

                          <Message success
                              header={t("Sucesso")}
                              content={t("Foi enviado um email com instruções para recuperar a password")}
                          />

                          <p>
                              <Link to="/login">{t("Voltar ao login")}</Link>
                          </p>

                        </Form>

                  </div>
              )}
          </I18n>
        )
    }
}

export default LoginPage
