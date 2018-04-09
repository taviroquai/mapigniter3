import React, { Component } from 'react';
import { Form, Message, Button } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

class Profile extends Component {

    render() {
        const { user, submit, error, errors, handleFormInput } = this.props
        return (
            <I18n ns="translations">
                { (t, { i18n }) => (
                    <div className="ui main container">
                        <h1 className="ui header">{t('My Profile')}</h1>

                        <Form error={error} onSubmit={submit}>

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
                                            error={errors && errors.email}
                                            value={user.email || ''}
                                            onChange={handleFormInput}
                                        />
                                    </Form.Field>
                                </div>
                                <div className="three wide column">
                                    <Form.Field required>
                                        <label>{t('Username')}</label>
                                        <Form.Input name="username" placeholder={t('Username')}
                                            error={errors && errors.username}
                                            value={user.username || ''}
                                            onChange={handleFormInput}
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
                                            error={errors && errors.password}
                                            value={user.password || '' }
                                            onChange={handleFormInput}
                                        />
                                    </Form.Field>
                                </div>

                                <div className="eight wide column">
                                    <Form.Field required>
                                        <label>{t('Password confirmation')}</label>
                                        <Form.Input name="password_confirmation" placeholder={t('Password confirmation')}
                                            type="password"
                                            value={user.password_confirmation || '' }
                                            onChange={handleFormInput}
                                        />
                                    </Form.Field>
                                </div>

                                { errors && errors.password ? (
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
