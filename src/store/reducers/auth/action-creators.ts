import { AppDispatch } from "../..";
import { IUser } from "../../../models/IUser";
import UserService from "../../../api/UserService";
import { AuthActionsEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from "./types";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionsEnum.SET_USER, payload: user}),
    setError: (error: string): SetErrorAction => ({type: AuthActionsEnum.SET_ERROR, payload: error}),
    setAuth: (auth: boolean): SetAuthAction => ({type: AuthActionsEnum.SET_AUTH, payload: auth}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionsEnum.SET_IS_LOADING, payload: payload}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true))
            setTimeout(async ()=>{
                const response = await UserService.getUsers()
                const mockUsers = response.data.find(user => user.username === username && user.password === password)
                if(mockUsers) {
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', mockUsers.username)
                    dispatch(AuthActionCreators.setUser(mockUsers))
                    dispatch(AuthActionCreators.setAuth(true))
                } else {
                    dispatch(AuthActionCreators.setError('Некорректный логин или пароль!'))
                    dispatch(AuthActionCreators.setIsLoading(false))
                    console.log(2)
                }
    
            }, 1000)
        } catch (e) {
            dispatch(AuthActionCreators.setError('Failure'))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
            localStorage.removeItem('auth')
            localStorage.removeItem('user')
            dispatch(AuthActionCreators.setUser({} as IUser))
            dispatch(AuthActionCreators.setAuth(false))
    }

}