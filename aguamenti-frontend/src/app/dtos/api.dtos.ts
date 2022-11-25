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