import { attackType } from "./attackType";

export enum dataStatus{
    LOADING = 'loading',
    SUCCESS = 'success',
    FAILED = 'failed',
    IDLE = 'idle'
}

export interface attackTypeState {
    error: string | null;
    status: dataStatus;
    attack: attackType[] | any;
    role: string | undefined;

}
