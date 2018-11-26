import { IAppAction, ActionType } from './Helpers';
import { match } from 'react-router';
import { Utility } from '../state/Utility';
import { Alert } from '../state/Alert';
import { Spinner } from '../state/Spinner';
import { User } from '../state/User';
import * as firebase from 'firebase';
import { Dispatch } from 'react-redux';
import { IRegisterModel } from 'src/models';

export interface IApplicationProps {
    openDrawer: () => IAppAction;
    closeDrawer: () => IAppAction;
    showPopup: (alert: Alert) => IAppAction;
    closePopup: () => IAppAction;  
    showSpinner: (message: string) => IAppAction;
    hideSpinner: () => IAppAction; 
    login: (data: any) => IAppAction; 
    register: (data: IRegisterModel) => IAppAction; 
    logout: () => IAppAction;
    createUser: (content: any) => any;
    getUser: (id: any) => any;
    fetchUsers: (context?: any) => any;
    updateUser: (context: any) => any;
    deleteUser: (context: any) => any;
    createMaterial: (content: any) => any;
    getMaterial: (id: any) => any;
    fetchMaterials: (context?: any) => any;
    updateMaterial: (context: any) => any;
    deleteMaterial: (context: any) => any;
    getMail: (id: any) => any;
    fetchMails: (context?: any) => any;
    updateMail: (context: any) => any;
    deleteMail: (context: any) => any;
    match: match<any>,
    location: any,
    history: any,
    utility: Utility;
    authentication: User;
    users: any;
    materials: any;
    mail: any[];
    materialCharts: Array<{name: string, value: number, fill: string}>;
}

export const openDrawer = (): IAppAction => {
    return {
        type: ActionType.OPEN_DRAWER
    };
};

export const closeDrawer = (): IAppAction => {
    return {
        type: ActionType.CLOSE_DRAWER
    };
};

export const showPopup = (data: Alert): IAppAction => {
    return {
        type: ActionType.OPEN_ALERT,
        payload: data
    };
};

export const closePopup = (): IAppAction => {
    return {
        type: ActionType.CLOSE_ALERT
    };
};

export const showSpinner = (message: string): IAppAction => {
    return {
        type: ActionType.OPEN_SPINNER,
        payload: new Spinner({message})
    };
};

export const hideSpinner = (): IAppAction => {
    return {
        type: ActionType.CLOSE_SPINNER
    };
};

export const login = (data: any): IAppAction => {
    return { type: ActionType.LOGIN_REQUEST, payload: data };
};

export const logout = (): IAppAction => {
    return { type: ActionType.LOGOUT_REQUEST };
};

export const register = (data: IRegisterModel) => {
    return async (dispatch: Dispatch<IAppAction>) => {
        dispatch({ type: ActionType.REGISTER_REQUEST, payload: data });
        try {
            const response = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword (data.email, data.password);
            await response.user.updateProfile({displayName: data.displayName, photoURL: ''})
            await response.user.sendEmailVerification();
            dispatch({ type: ActionType.REGISTER_SUCCESS, payload: response });
        } catch (error) {
            dispatch({type: ActionType.REGISTER_FAIL, payload: {errorMessage: 'Failed to register user.', error}});
        }
    }
};
