import {test, expect} from '@playwright/test'
import {HealhtCheckApi} from '../../api/HealtCheckApi';

test('HealthCheck API 200', async({request})=>{
    const api=new HealhtCheckApi(request);
    const response=await api.healthCheck();

    expect(response.status()).toBe(200);
    const body=await response.json();
    console.log(body);
   
    expect(body).toMatchObject({
       "status": "UP",
       "success": true,
    });
});