import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpCacheService } from "./http-cache.service";

@Injectable()
export class CacheIntercepto implements HttpInterceptor{
  constructor(private cacheService:HttpCacheService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //pass along non-cacheable requests and invalidates cache
    if(req.method!=='GET'){
      console.log(`Invalid`);
      this.cacheService.invalidateCache();
      return next.handle(req);
    }

    //attempt to retrive a cached respoe

    const cacheResponse : HttpResponse<any> = this.cacheService.get(req.url);

    //return cached response
    if(cacheResponse){
      return of(cacheResponse);
    }

    //send request to server and add response to cache

return next.handle(req).pipe(
  tap(event=>{
    if(event instanceof HttpResponse){
      this.cacheService.put(req.url,event);
    }
  })
)
  }

}
