import type { APIRequestContext } from "playwright";
import {endpoints} from './endpoints'

export class HealhtCheckApi{
    constructor(private readonly request:APIRequestContext){}

    healthCheck(){
        return this.request.get(endpoints.healthCheck);
    }
}