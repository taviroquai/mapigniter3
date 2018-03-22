import React, { Component } from 'react';
import { Form, Message, Button } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

class Profile extends Component {

    render() {

        // Render form
        return (
            <I18n ns="translations">
                { (t, { i18n }) => (
                    <div className="ui main container">
                        <h1 className="ui header">{t('My Profile')}</h1>

                        <Form error={this.props.error} onSubmit={this.props.submit}>

                            <div className="ui grid">
                                <div className="sixteen wide column">
                                    <Message error
                                        header={t('Error')}
                                        content={t("Please check errors below in red")}
                                    />
                                </div>
                                <div className="ten wide column">
                                    <Form.Field required>
                                        <label>{t('Email')}</label>
                                        <Form.Input name="email" placeholder={t('Email')}
                                            error={this.props.errors && this.props.errors.email}
                                            value={this.props.user.email || ''}
                                            onChange={this.props.handleFormInput}
                                        />
                                    </Form.Field>
                                </div>
                                <div className="three wide column">
                                    <Form.Field required>
                                        <label>{t('Username')}</label>
                                        <Form.Input name="username" placeholder={t('Username')}
                                            error={this.props.errors && this.props.errors.username}
                                            value={this.props.user.username || ''}
                                            onChange={this.props.handleFormInput}
                                        />
                                    </Form.Field>
                                </div>
                                <div className="three wide column" style={{paddingTop: '2.7rem'}}>
                                    <Button type="submit">{t('Guardar')}</Button>
                                </div>

                                <div className="eight wide column">
                                    <Form.Field required>
                                        <label>{t('Password')}</label>
                                        <Form.Input name="password" placeholder={t('Password')}
                                            type="password"
                                            error={this.props.errors && this.props.errors.password}
                                            value={this.props.user.password || '' }
                                            onChange={this.props.handleFormInput}
                                        />
                                    </Form.Field>
                                </div>

                                <div className="eight wide column">
                                    <Form.Field required>
                                        <label>{t('Password confirmation')}</label>
                                        <Form.Input name="password_confirmation" placeholder={t('Password confirmation')}
                                            type="password"
                                            value={this.props.user.password_confirmation || '' }
                                            onChange={this.props.handleFormInput}
                                        />
                                    </Form.Field>
                                </div>

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

                            </div>
                        </Form>

                    </div>
                )}
            </I18n>
        );
    }
}

export default Profile;
