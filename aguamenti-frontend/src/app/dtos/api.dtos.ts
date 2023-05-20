import { HttpHeaders } from "@angular/common/http";

export interface HttpHeaderOptions {
    headers: HttpHeaders
}

export interface GenericApiResponse {
    code: number,
    result?: any,
    type: string,
    message: string
}

export type TriggerType = "timing" | "action";
export type ScheduleType = "on" | "off" | "dim" | "and" | "or";
export type WeekDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export interface Schedule {
    _id: string,
    name: string,
    enabled: string,
    threshold_value?: any,
    chip_id?: string,
    linked_chip_id: string,
    schedule_type: ScheduleType,
    trigger_type: TriggerType,
    repeat_on: WeekDay[],
    repeat_time?: Date,
}