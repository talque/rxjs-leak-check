import { Injectable } from "@angular/core";
import { StackFrame } from 'error-stack-parser';
import StackTraceGPS from 'stacktrace-gps';


function cacheKey(sf: StackFrame): string {
    return `${sf.lineNumber}:${sf.columnNumber}:${sf.fileName}`;
}


/**
 * Resolve source map of a stack frame with caching
 *
 * Most stack frames that we come across are always the same
 * locations, e.g. for rxjs operators. By caching individual frames we
 * can speed up resolution dramatically.
 */
@Injectable({ providedIn: 'root' })
export class StackFrameLoaderService {
    
    // keep the instance cached, otherwise source maps are loaded multiple times
    private readonly gps = new StackTraceGPS();

    private cache = new Map<string, StackFrame>();
    
    async load(stackFrame: StackFrame): Promise<StackFrame> {
        const key = cacheKey(stackFrame);
        const cached = this.cache.get(key);
        if (cached)
            return cached;
        const resolved = await this.gps.getMappedLocation(stackFrame);
        this.cache.set(key, resolved);
        // console.log('new key:', key);
        return resolved;
    }
}
