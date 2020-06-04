import { DangerLabel, Form, FormAcceptButton, FormButton, FormButtonBar, FormPassword, FormTitle, GlobalContent, goHome, useErrorHandler } from "mascotas_react_common";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { changePassword } from "../api/userApi";
import "../styles.css";


export default function Password(props: RouteComponentProps) {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPassword2, setNewPassword2] = useState("")

    const errorHandler = useErrorHandler()

    const updatePasswordClick = async () => {
        errorHandler.cleanRestValidations();

        if (!currentPassword) {
            errorHandler.addError("currentPassword", "No puede estar vacío");
        }
        if (!newPassword) {
            errorHandler.addError("newPassword", "No puede estar vacío");
        }
        if (newPassword !== newPassword2) {
            errorHandler.addError("newPassword2", "Las contraseñas no coinciden");
        }

        if (errorHandler.hasErrors()) {
            return
        }

        try {
            await changePassword({
                currentPassword,
                newPassword
            });
            props.history?.push("/");
        } catch (error) {
            errorHandler.processRestValidations(error);
        }
    }

    return (
        <GlobalContent>
            <FormTitle>Cambiar Password</FormTitle>

            <Form>
                <FormPassword
                    label="Password Actual"
                    name="currentPassword"
                    errorHandler={errorHandler}
                    onChange={event => setCurrentPassword(event.target.value)} />

                <FormPassword
                    label="Nuevo Password"
                    name="newPassword"
                    errorHandler={errorHandler}
                    onChange={event => setNewPassword(event.target.value)} />

                <FormPassword
                    label="Repetir Password"
                    name="newPassword2"
                    errorHandler={errorHandler}
                    onChange={event => setNewPassword2(event.target.value)} />

                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Cambiar" onClick={updatePasswordClick} />
                    <FormButton label="Cancelar" onClick={() => goHome(props)} />
                </FormButtonBar>
            </Form >
        </GlobalContent>
    );
}
