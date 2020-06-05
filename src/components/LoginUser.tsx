import { DangerLabel, Form, FormAcceptButton, FormButton, FormButtonBar, FormInput, FormTitle, GlobalContent, FormPassword } from "mascotas_react_common";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useErrorHandler } from "mascotas_react_common";
import { goHome } from "mascotas_react_common";
import { login } from "../api/userApi";

export function LoginUser(props: RouteComponentProps) {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const errorHandler = useErrorHandler()

    const loginClick = async () => {
        errorHandler.cleanRestValidations();
        if (!userName) {
            errorHandler.addError("login", "No puede estar vacío");
        }
        if (!password) {
            errorHandler.addError("password", "No puede estar vacío");
        }
        if (errorHandler.hasErrors()) {
            return;
        }

        try {
            await login({
                login: userName,
                password
            });
            goHome(props)
        } catch (error) {
            errorHandler.processRestValidations(error);
        }
    }

    return (
        <GlobalContent>
            <FormTitle>Login</FormTitle>

            <Form>
                <FormInput
                    label="Usuario"
                    name="login"
                    errorHandler={errorHandler}
                    onChange={(event) => setUserName(event.target.value)} />

                <FormPassword
                    label="Password"
                    name="password"
                    errorHandler={errorHandler}
                    onChange={(event) => setPassword(event.target.value)} />

                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Login" onClick={loginClick} />
                    <FormButton label="Cancelar" onClick={() => goHome(props)} />
                </FormButtonBar>
            </Form >
        </GlobalContent >
    );
}
