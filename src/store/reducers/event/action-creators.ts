import { AppDispatch } from "../..";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";
import UserService from "../../../api/UserService";
import {EventActionEnum, SetEventAction, SetGuestAction} from './types'

export const EventActionCreatos = {
    setGuest: (payload: IUser[]): SetGuestAction => ({ type: EventActionEnum.SET_GUEST, payload}),
    setEvents: (payload: IEvent[]): SetEventAction => ({type: EventActionEnum.SET_EVENTS, payload}),
    fecthGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.getUsers()
            dispatch(EventActionCreatos.setGuest(response.data))
        } catch (e) {
            console.log(e)
        }
    },
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            json.push(event)
            dispatch(EventActionCreatos.setEvents(json))
            localStorage.setItem('events', JSON.stringify(json))
        } catch (e) {
            console.log(e)
        }
    },
    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            const currentUserEvent = json.filter(ev=> ev.author === username || ev.guest === username)
            dispatch(EventActionCreatos.setEvents(currentUserEvent))
        } catch (e) {
            console.log(e)
        }
    }
}